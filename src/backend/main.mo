import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Time "mo:core/Time";

actor {
  // Comic Types
  type Comic = {
    id : Nat;
    title : Text;
    author : Text;
    genre : Text;
    coverImage : Text;
    episodes : Nat;
    likes : Nat;
    description : Text;
  };

  // FAQ Types
  type FaqItem = {
    id : Nat;
    category : Text;
    question : Text;
    answer : Text;
    helpfulCount : Nat;
    notHelpfulCount : Nat;
    approved : Bool;
    viewCount : Nat;
    createdAt : Int;
  };

  type SubmittedQuestion = {
    id : Nat;
    name : ?Text;
    email : ?Text;
    question : Text;
    status : Text;
    answer : Text;
    submittedAt : Int;
  };

  var nextComicId = 1;
  var nextFaqId = 1;
  var nextQuestionId = 1;

  let comicsMap = Map.empty<Nat, Comic>();
  let faqMap = Map.empty<Nat, FaqItem>();
  let submittedQuestionsMap = Map.empty<Nat, SubmittedQuestion>();

  let genresArray = [
    "Action",
    "Romance",
    "Drama",
    "Fantasy",
    "Comedy",
    "Horror",
    "Slice of Life",
  ];

  // ADMIN PASSWORD AUTH (not secure, just for demo)
  func isAdmin(password : Text) : Bool {
    password == "URComics2024!";
  };

  // FAQ & HELP CENTER METHODS
  public query ({ caller }) func getAllApprovedFaqs() : async [FaqItem] {
    let approvedFaqs = faqMap.values().filter(
      func(item) { item.approved }
    );
    approvedFaqs.toArray();
  };

  public query ({ caller }) func getFaqsByCategory(category : Text) : async [FaqItem] {
    let filtered = faqMap.values().filter(
      func(item) {
        item.category == category and item.approved;
      }
    );
    filtered.toArray();
  };

  public query ({ caller }) func getPopularFaqs() : async [FaqItem] {
    let approvedItems = faqMap.values().filter(
      func(item) { item.approved }
    ).toArray();

    let sortedItems = approvedItems.sort(
      func(a, b) {
        let aScore = a.helpfulCount + a.viewCount;
        let bScore = b.helpfulCount + b.viewCount;
        Nat.compare(bScore, aScore);
      }
    );

    if (sortedItems.size() <= 6) {
      sortedItems;
    } else {
      Array.tabulate<FaqItem>(6, func(i) { sortedItems[i] });
    };
  };

  public shared ({ caller }) func recordFaqView(id : Nat) : async Bool {
    switch (faqMap.get(id)) {
      case (null) { false };
      case (?item) {
        let updatedItem = {
          item with
          viewCount = item.viewCount + 1;
        };
        faqMap.add(id, updatedItem);
        true;
      };
    };
  };

  public shared ({ caller }) func voteHelpful(id : Nat, helpful : Bool) : async Bool {
    switch (faqMap.get(id)) {
      case (null) { false };
      case (?item) {
        let updatedItem = if (helpful) {
          { item with helpfulCount = item.helpfulCount + 1 };
        } else {
          { item with notHelpfulCount = item.notHelpfulCount + 1 };
        };
        faqMap.add(id, updatedItem);
        true;
      };
    };
  };

  // SUBMITTED QUESTIONS
  public shared ({ caller }) func submitQuestion(name : ?Text, email : ?Text, question : Text) : async Nat {
    let newId = nextQuestionId;
    let newQuestion : SubmittedQuestion = {
      id = newId;
      name;
      email;
      question;
      status = "pending";
      answer = "";
      submittedAt = Time.now();
    };
    submittedQuestionsMap.add(newId, newQuestion);
    nextQuestionId += 1;
    newId;
  };

  public query ({ caller }) func getAllSubmittedQuestions() : async [SubmittedQuestion] {
    submittedQuestionsMap.values().toArray();
  };

  public shared ({ caller }) func answerQuestion(password : Text, questionId : Nat, answer : Text) : async Bool {
    if (not isAdmin(password)) { return false };
    switch (submittedQuestionsMap.get(questionId)) {
      case (null) { false };
      case (?question) {
        let updatedQuestion = {
          question with
          status = "answered";
          answer;
        };
        submittedQuestionsMap.add(questionId, updatedQuestion);
        true;
      };
    };
  };

  public shared ({ caller }) func approveQuestion(password : Text, questionId : Nat, answer : Text) : async Bool {
    if (not isAdmin(password)) { return false };

    switch (submittedQuestionsMap.get(questionId)) {
      case (null) { false };
      case (?question) {
        let faqId = nextFaqId;
        let newFaq : FaqItem = {
          id = faqId;
          category = "General";
          question = question.question;
          answer;
          helpfulCount = 0;
          notHelpfulCount = 0;
          approved = true;
          viewCount = 0;
          createdAt = Time.now();
        };

        faqMap.add(faqId, newFaq);
        nextFaqId += 1;

        let updatedQuestion = {
          question with
          status = "approved";
          answer;
        };
        submittedQuestionsMap.add(questionId, updatedQuestion);
        true;
      };
    };
  };

  public shared ({ caller }) func rejectQuestion(password : Text, questionId : Nat) : async Bool {
    if (not isAdmin(password)) { return false };
    switch (submittedQuestionsMap.get(questionId)) {
      case (null) { false };
      case (?question) {
        let updatedQuestion = {
          question with
          status = "rejected";
        };
        submittedQuestionsMap.add(questionId, updatedQuestion);
        true;
      };
    };
  };

  public query ({ caller }) func verifyAdminPassword(password : Text) : async Bool {
    isAdmin(password);
  };

  // COMICS METHODS (Unchanged)
  public query ({ caller }) func getComicById(id : Nat) : async ?Comic {
    comicsMap.get(id);
  };

  public query ({ caller }) func getAllComics() : async [Comic] {
    comicsMap.values().toArray();
  };

  public query ({ caller }) func getComicsByGenre(genre : Text) : async [Comic] {
    let filtered = comicsMap.values().filter(
      func(comic) {
        comic.genre == genre;
      }
    );
    filtered.toArray();
  };

  public query ({ caller }) func getAllGenres() : async [Text] {
    genresArray;
  };

  // Preseeded Data Initialization
  system func preupgrade() {};

  system func postupgrade() {
    nextComicId := 4;
    // Comics Sample Data
    comicsMap.add(
      1,
      {
        id = 1;
        title = "Superhero Adventures";
        author = "Jane Doe";
        genre = "Action";
        coverImage = "superhero.png";
        episodes = 10;
        likes = 1500;
        description = "Follow the journey of a new superhero saving the city!";
      },
    );

    comicsMap.add(
      2,
      {
        id = 2;
        title = "Love in Spring";
        author = "John Smith";
        genre = "Romance";
        coverImage = "loveinspring.png";
        episodes = 20;
        likes = 2300;
        description = "A heartwarming romance blossoming in the springtime.";
      },
    );

    comicsMap.add(
      3,
      {
        id = 3;
        title = "Mystic Realm";
        author = "Alice Wonderland";
        genre = "Fantasy";
        coverImage = "mysticrealm.png";
        episodes = 15;
        likes = 1800;
        description = "Journey into a world of magic and mythical creatures.";
      },
    );

    // Preseeded FAQs
    let faqs : [FaqItem] = [
      // Getting Started
      {
        id = 1;
        category = "Getting Started";
        question = "How do I create an account?";
        answer = "Tap the Sign Up button, fill in your details and validate your email address. Once submitted you can start reading comics, uploading content and bookmarking favorites.";
        helpfulCount = 0;
        notHelpfulCount = 0;
        approved = true;
        viewCount = 0;
        createdAt = Time.now();
      },
      {
        id = 2;
        category = "Getting Started";
        question = "How does the ranking system work?";
        answer = "Comics and novels are ranked based on views, likes and bookmarks. The more engagement a comic receives, the higher it ranks in search results and trending lists.";
        helpfulCount = 0;
        notHelpfulCount = 0;
        approved = true;
        viewCount = 0;
        createdAt = Time.now();
      },
      // Reading Comics
      {
        id = 3;
        category = "Reading Comics";
        question = "How do I bookmark a comic?";
        answer = "Click the bookmark icon next to any comic or episode. Bookmarked items will be stored in your library for easy access.";
        helpfulCount = 0;
        notHelpfulCount = 0;
        approved = true;
        viewCount = 0;
        createdAt = Time.now();
      },
      {
        id = 4;
        category = "Reading Comics";
        question = "How do I follow a creator?";
        answer = "Visit the creator's profile and click the follow button. You'll receive notifications for new uploads and updates from followed creators.";
        helpfulCount = 0;
        notHelpfulCount = 0;
        approved = true;
        viewCount = 0;
        createdAt = Time.now();
      },
      // Uploading Comics
      {
        id = 5;
        category = "Uploading Comics";
        question = "How do I upload a comic?";
        answer = "Navigate to the Upload section, fill in the comic details, and upload your cover image and comic pages. Supported formats include JPG, PNG, and WebP for images. Submit your comic for review and publishing.";
        helpfulCount = 0;
        notHelpfulCount = 0;
        approved = true;
        viewCount = 0;
        createdAt = Time.now();
      },
      {
        id = 6;
        category = "Uploading Comics";
        question = "What file formats are supported?";
        answer = "You can upload comic pages as JPG, PNG, or WebP images. Make sure your files are high quality for the best viewing experience.";
        helpfulCount = 0;
        notHelpfulCount = 0;
        approved = true;
        viewCount = 0;
        createdAt = Time.now();
      },
      // Uploading Novels
      {
        id = 7;
        category = "Uploading Novels";
        question = "How do I upload a novel?";
        answer = "Go to the Upload section, select Novels, and enter your story details. You can upload chapters one by one or all at once. Supported formats are TXT and DOCX files.";
        helpfulCount = 0;
        notHelpfulCount = 0;
        approved = true;
        viewCount = 0;
        createdAt = Time.now();
      },
      {
        id = 8;
        category = "Uploading Novels";
        question = "Can I upload multiple chapters at once?";
        answer = "Yes, you can upload multiple chapters together. Ensure each chapter is properly formatted and labeled for easy navigation.";
        helpfulCount = 0;
        notHelpfulCount = 0;
        approved = true;
        viewCount = 0;
        createdAt = Time.now();
      },
      // Bookmarks & Library
      {
        id = 9;
        category = "Bookmarks & Library";
        question = "How do bookmarks work?";
        answer = "Bookmarks allow you to save your favorite comics and novels for quick access. View your bookmarks in your personal library.";
        helpfulCount = 0;
        notHelpfulCount = 0;
        approved = true;
        viewCount = 0;
        createdAt = Time.now();
      },
      {
        id = 10;
        category = "Bookmarks & Library";
        question = "Where can I find my saved comics?";
        answer = "Access your saved comics in the Library section. This includes all bookmarks, favorites, and downloaded content.";
        helpfulCount = 0;
        notHelpfulCount = 0;
        approved = true;
        viewCount = 0;
        createdAt = Time.now();
      },
      // Technical Issues
      {
        id = 11;
        category = "Technical Issues";
        question = "Why is my upload failing?";
        answer = "Ensure your files are in the supported formats and within the size limits. Check your internet connection and try again.";
        helpfulCount = 0;
        notHelpfulCount = 0;
        approved = true;
        viewCount = 0;
        createdAt = Time.now();
      },
      {
        id = 12;
        category = "Technical Issues";
        question = "The app is loading slowly, what should I do?";
        answer = "Check your internet connection and restart the app. Clear cache if needed and ensure your device software is up to date.";
        helpfulCount = 0;
        notHelpfulCount = 0;
        approved = true;
        viewCount = 0;
        createdAt = Time.now();
      },
    ];

    for (faq in faqs.values()) {
      faqMap.add(faq.id, faq);
    };
  };
};
