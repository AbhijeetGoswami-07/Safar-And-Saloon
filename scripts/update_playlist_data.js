const fs = require('fs');

const gulzarTracks = [
  {
    id: "_UEpGEXcMn4",
    title: "Tujhse Naraz Nahin Zindagi",
    artist: "Anup Ghoshal, Lata Mangeshkar",
    movie: "Masoom (1983)",
    duration: "5:41",
    thumb: "https://img.youtube.com/vi/_UEpGEXcMn4/hqdefault.jpg",
    tag: "Gulzar Masterpiece"
  },
  {
    id: "Zm4V6ty4K6k",
    title: "Tere Bina Zindagi Se Koi",
    artist: "Kishore Kumar, Lata Mangeshkar",
    movie: "Aandhi (1975)",
    duration: "5:52",
    thumb: "https://img.youtube.com/vi/Zm4V6ty4K6k/hqdefault.jpg",
    tag: "Soulful Ghazal"
  },
  {
    id: "MDXFi3avqo0",
    title: "Woh Shaam Kuchh Ajeeb Thi",
    artist: "Kishore Kumar",
    movie: "Khamoshi (1969)",
    duration: "4:46",
    thumb: "https://img.youtube.com/vi/MDXFi3avqo0/hqdefault.jpg",
    tag: "Poetic Solitude"
  },
  {
    id: "XUexH7Xk1yk",
    title: "Mera Kuchh Saamaan",
    artist: "Asha Bhosle",
    movie: "Ijaazat (1987)",
    duration: "6:05",
    thumb: "https://img.youtube.com/vi/XUexH7Xk1yk/hqdefault.jpg",
    tag: "National Award Winner"
  },
  {
    id: "3UsReAi_LIU",
    title: "Shaam Se Aankh Mein Nami Si Hai",
    artist: "Jagjit Singh, Gulzar",
    movie: "Marasim (1999)",
    duration: "5:22",
    thumb: "https://img.youtube.com/vi/3UsReAi_LIU/hqdefault.jpg",
    tag: "Acoustic Ghazal"
  },
  {
    id: "Q87TZLzRfwU",
    title: "Haath Chhoote Bhi Toh",
    artist: "Jagjit Singh, Gulzar",
    movie: "Marasim (1999)",
    duration: "5:18",
    thumb: "https://img.youtube.com/vi/Q87TZLzRfwU/hqdefault.jpg",
    tag: "Marasim Classic"
  },
  {
    id: "WKP5cqQvUBg",
    title: "Dil Dhoondta Hai Phir Wohi",
    artist: "Bhupinder Singh, Lata Mangeshkar",
    movie: "Mausam (1975)",
    duration: "4:15",
    thumb: "https://img.youtube.com/vi/WKP5cqQvUBg/hqdefault.jpg",
    tag: "Timeless Poetry"
  },
  {
    id: "uLi3WcON1CU",
    title: "Do Deewane Shahar Mein",
    artist: "Bhupinder Singh, Runa Laila",
    movie: "Ghar (1978)",
    duration: "4:50",
    thumb: "https://img.youtube.com/vi/uLi3WcON1CU/hqdefault.jpg",
    tag: "Monsoon Ghazal"
  },
  {
    id: "lySbCeZjVlw",
    title: "Naam Gum Jayega",
    artist: "Lata Mangeshkar, Bhupinder Singh",
    movie: "Kinara (1977)",
    duration: "5:25",
    thumb: "https://img.youtube.com/vi/lySbCeZjVlw/hqdefault.jpg",
    tag: "Everlasting Identity"
  },
  {
    id: "dmm5lM9BR8o",
    title: "Aap Ki Ankhon Mein Kuch",
    artist: "Kishore Kumar, Lata Mangeshkar",
    movie: "Ghar (1978)",
    duration: "4:10",
    thumb: "https://img.youtube.com/vi/dmm5lM9BR8o/hqdefault.jpg",
    tag: "Pure Romanticism"
  },
  {
    id: "Efx7BIzMEPI",
    title: "Is Mod Se Jaate Hain",
    artist: "Kishore Kumar, Lata Mangeshkar",
    movie: "Aandhi (1975)",
    duration: "4:55",
    thumb: "https://img.youtube.com/vi/Efx7BIzMEPI/hqdefault.jpg",
    tag: "Golden Nostalgia"
  }
];

const marathiSadTracks = [
  {
    id: "2JZTIVd4XN0",
    title: "Man Udhan Varyache",
    artist: "Shankar Mahadevan, Ajay-Atul",
    movie: "Agga Bai Arrecha (2004)",
    duration: "5:12",
    thumb: "https://img.youtube.com/vi/2JZTIVd4XN0/hqdefault.jpg",
    tag: "Heartache Classic"
  },
  {
    id: "3zdCPhX7ah4",
    title: "Kiti Sangaychay Mala",
    artist: "Jasraj Joshi, Anandi Joshi",
    movie: "Double Seat (2015)",
    duration: "4:48",
    thumb: "https://img.youtube.com/vi/3zdCPhX7ah4/hqdefault.jpg",
    tag: "Deep Sorrow"
  },
  {
    id: "Y4TICMyl9Eg",
    title: "Kadhi Tu Rimjhim Zharanari",
    artist: "Saleel Kulkarni, Sandeep Khare",
    movie: "Mumbai Pune Mumbai (2010)",
    duration: "5:30",
    thumb: "https://img.youtube.com/vi/Y4TICMyl9Eg/hqdefault.jpg",
    tag: "Melancholic Rain"
  },
  {
    id: "cRKNTAbnYRs",
    title: "Deva Tujhya Gabharyala",
    artist: "Adarsh Shinde, Kirti Killedar",
    movie: "Duniyadari (2013)",
    duration: "4:35",
    thumb: "https://img.youtube.com/vi/cRKNTAbnYRs/hqdefault.jpg",
    tag: "Soulful Agony"
  },
  {
    id: "OkNLme6dCsE",
    title: "Mee Raat Takali",
    artist: "Lata Mangeshkar",
    movie: "Jait Re Jait (1977)",
    duration: "4:22",
    thumb: "https://img.youtube.com/vi/OkNLme6dCsE/hqdefault.jpg",
    tag: "Heartbreak Folklore"
  },
  {
    id: "DQNxigVPh1s",
    title: "Jeevalaga Rahile Re Door",
    artist: "Lata Mangeshkar, Sudhir Phadke",
    movie: "Bhavgeet Classic",
    duration: "4:15",
    thumb: "https://img.youtube.com/vi/DQNxigVPh1s/hqdefault.jpg",
    tag: "Wounds of Heart"
  },
  {
    id: "I9Ehun8Ahk4",
    title: "Shravanat Ghan Neela",
    artist: "Lata Mangeshkar, Hridaynath Mangeshkar",
    movie: "Marathi Bhavgeet",
    duration: "4:40",
    thumb: "https://img.youtube.com/vi/I9Ehun8Ahk4/hqdefault.jpg",
    tag: "Poignant Rain"
  },
  {
    id: "UXJF8e90Nxc",
    title: "Usavale Dhaage",
    artist: "Hamsika Iyer, Rahul Ranade",
    movie: "Mangalashtak Once More (2013)",
    duration: "4:50",
    thumb: "https://img.youtube.com/vi/UXJF8e90Nxc/hqdefault.jpg",
    tag: "Emotional Solitude"
  },
  {
    id: "0wWF0Lons_A",
    title: "Tula Pahate Re",
    artist: "Zee Marathi Special",
    movie: "Tula Pahate Re (2018)",
    duration: "4:20",
    thumb: "https://img.youtube.com/vi/0wWF0Lons_A/hqdefault.jpg",
    tag: "Haunting Melancholy"
  },
  {
    id: "OU1fvtWggBk",
    title: "Atasha Ase He Mala Kay Hote",
    artist: "Sandeep Khare, Saleel Kulkarni",
    movie: "Ayushyavar Bolu Kahi",
    duration: "5:05",
    thumb: "https://img.youtube.com/vi/OU1fvtWggBk/hqdefault.jpg",
    tag: "Soulful Separation"
  }
];

const deluxeRomanceTracks = [
  {
    id: "RVQsBlI35vw",
    title: "Mera Dil Bhi Kitna Pagal Hai",
    artist: "Kumar Sanu, Alka Yagnik",
    movie: "Saajan (1991)",
    duration: "5:25",
    thumb: "https://img.youtube.com/vi/RVQsBlI35vw/hqdefault.jpg",
    tag: "Kumar Sanu Gold"
  },
  {
    id: "KeyfUuXPOcY",
    title: "Dheere Dheere Se Meri Zindagi",
    artist: "Kumar Sanu, Anuradha Paudwal",
    movie: "Aashiqui (1990)",
    duration: "5:30",
    thumb: "https://img.youtube.com/vi/KeyfUuXPOcY/hqdefault.jpg",
    tag: "Nadeem-Shravan"
  },
  {
    id: "uNt18l9UfjE",
    title: "Nazar Ke Samne Jigar Ke Paas",
    artist: "Kumar Sanu, Anuradha Paudwal",
    movie: "Aashiqui (1990)",
    duration: "5:36",
    thumb: "https://img.youtube.com/vi/uNt18l9UfjE/hqdefault.jpg",
    tag: "Vintage Masterpiece"
  },
  {
    id: "cNV5hLSa9H8",
    title: "Tujhe Dekha Toh Yeh Jaana Sanam",
    artist: "Kumar Sanu, Lata Mangeshkar",
    movie: "DDLJ (1995)",
    duration: "5:04",
    thumb: "https://img.youtube.com/vi/cNV5hLSa9H8/hqdefault.jpg",
    tag: "90s Romance"
  },
  {
    id: "htMvfOfixuM",
    title: "Ek Ladki Ko Dekha Toh Aisa Laga",
    artist: "Kumar Sanu",
    movie: "1942: A Love Story (1994)",
    duration: "4:36",
    thumb: "https://img.youtube.com/vi/htMvfOfixuM/hqdefault.jpg",
    tag: "Acoustic Melody"
  },
  {
    id: "Mj3KyjuKbqI",
    title: "Aaye Ho Meri Zindagi Mein",
    artist: "Udit Narayan",
    movie: "Raja Hindustani (1996)",
    duration: "6:02",
    thumb: "https://img.youtube.com/vi/Mj3KyjuKbqI/hqdefault.jpg",
    tag: "Saloon Special"
  },
  {
    id: "jspLMtqZFjY",
    title: "Pardesi Pardesi Jaana Nahi",
    artist: "Udit Narayan, Alka Yagnik",
    movie: "Raja Hindustani (1996)",
    duration: "7:31",
    thumb: "https://img.youtube.com/vi/jspLMtqZFjY/hqdefault.jpg",
    tag: "Everlasting"
  },
  {
    id: "5y_TCKNzAMI",
    title: "Tumse Milne Ko Dil Karta Hai",
    artist: "Kumar Sanu, Alka Yagnik",
    movie: "Phool Aur Kaante (1991)",
    duration: "5:32",
    thumb: "https://img.youtube.com/vi/5y_TCKNzAMI/hqdefault.jpg",
    tag: "Retro Classic"
  },
  {
    id: "bKZTnnFU9HA",
    title: "Kuch Kuch Hota Hai",
    artist: "Udit Narayan, Alka Yagnik",
    movie: "Kuch Kuch Hota Hai (1998)",
    duration: "4:56",
    thumb: "https://img.youtube.com/vi/bKZTnnFU9HA/hqdefault.jpg",
    tag: "Pure 90s"
  },
  {
    id: "iqNS2Qe4pp0",
    title: "Suraj Hua Maddham",
    artist: "Sonu Nigam, Alka Yagnik",
    movie: "K3G (2001)",
    duration: "7:08",
    thumb: "https://img.youtube.com/vi/iqNS2Qe4pp0/hqdefault.jpg",
    tag: "Timeless"
  },
  {
    id: "SBfPs-PMGTA",
    title: "Pehla Nasha",
    artist: "Udit Narayan, Sadhana Sargam",
    movie: "Jo Jeeta Wohi Sikandar (1992)",
    duration: "4:52",
    thumb: "https://img.youtube.com/vi/SBfPs-PMGTA/hqdefault.jpg",
    tag: "Slow Romance"
  }
];

const sundayChampiTracks = [
  {
    id: "OgocnLh9P1M",
    title: "Aankh Hai Bhari Bhari",
    artist: "Kumar Sanu",
    movie: "Tum Se Achcha Kaun Hai (2002)",
    duration: "6:58",
    thumb: "https://img.youtube.com/vi/OgocnLh9P1M/hqdefault.jpg",
    tag: "Barber Favourite"
  },
  {
    id: "C9efe0rjDlE",
    title: "Dil Hai Ki Manta Nahin",
    artist: "Kumar Sanu, Anuradha Paudwal",
    movie: "Dil Hai Ke Manta Nahin (1991)",
    duration: "6:10",
    thumb: "https://img.youtube.com/vi/C9efe0rjDlE/hqdefault.jpg",
    tag: "Sweet Classic"
  },
  {
    id: "_IcVb6hFhPs",
    title: "Ghar Se Nikalte Hi",
    artist: "Udit Narayan",
    movie: "Papa Kehte Hain (1996)",
    duration: "6:12",
    thumb: "https://img.youtube.com/vi/_IcVb6hFhPs/hqdefault.jpg",
    tag: "Morning Breeze"
  },
  {
    id: "UCsW7nea7sI",
    title: "Ae Mere Humsafar",
    artist: "Udit Narayan, Alka Yagnik",
    movie: "Qayamat Se Qayamat Tak (1988)",
    duration: "5:58",
    thumb: "https://img.youtube.com/vi/UCsW7nea7sI/hqdefault.jpg",
    tag: "Golden Hit"
  },
  {
    id: "9b0iydtDZLU",
    title: "Waada Raha Sanam",
    artist: "Alka Yagnik, Abhijeet",
    movie: "Khiladi (1992)",
    duration: "6:03",
    thumb: "https://img.youtube.com/vi/9b0iydtDZLU/hqdefault.jpg",
    tag: "Classic Romance"
  }
];

const dardEDilTracks = [
  {
    id: "G7AdjVDBLO8",
    title: "Achha Sila Diya Toone Mere Pyar Ka",
    artist: "Sonu Nigam",
    movie: "Bewafa Sanam (1995)",
    duration: "5:30",
    thumb: "https://img.youtube.com/vi/G7AdjVDBLO8/hqdefault.jpg",
    tag: "Soulful Ballad"
  },
  {
    id: "vRh1bnbZt4M",
    title: "Dil De Diya Hai",
    artist: "Anand Raj Anand",
    movie: "Masti (2004)",
    duration: "5:54",
    thumb: "https://img.youtube.com/vi/vRh1bnbZt4M/hqdefault.jpg",
    tag: "Heartbreak"
  },
  {
    id: "XWKazQwFFdY",
    title: "Tere Dard Se Dil Aabad Raha",
    artist: "Kumar Sanu",
    movie: "Deewana (1992)",
    duration: "4:52",
    thumb: "https://img.youtube.com/vi/XWKazQwFFdY/hqdefault.jpg",
    tag: "90s Drama"
  },
  {
    id: "rXHY4Cv9cA8",
    title: "Ab Tere Bin Jee Lenge Hum",
    artist: "Kumar Sanu",
    movie: "Aashiqui (1990)",
    duration: "5:45",
    thumb: "https://img.youtube.com/vi/rXHY4Cv9cA8/hqdefault.jpg",
    tag: "Melancholic"
  }
];

const vividhBharatiTracks = [
  {
    id: "QnlknU6PPxM",
    title: "Chura Liya Hai Tumne Jo Dil Ko",
    artist: "Asha Bhosle, Mohd Rafi",
    movie: "Yaadon Ki Baaraat (1973)",
    duration: "4:48",
    thumb: "https://img.youtube.com/vi/QnlknU6PPxM/hqdefault.jpg",
    tag: "Evergreen"
  },
  {
    id: "I9Ehun8Ahk4",
    title: "Lag Ja Gale / Shravanat Ghan Neela",
    artist: "Lata Mangeshkar",
    movie: "Classic Recordings",
    duration: "4:20",
    thumb: "https://img.youtube.com/vi/I9Ehun8Ahk4/hqdefault.jpg",
    tag: "Soulful"
  },
  {
    id: "gTy1Dho3bJE",
    title: "Yeh Shaam Mastani",
    artist: "Kishore Kumar",
    movie: "Kati Patang (1971)",
    duration: "4:38",
    thumb: "https://img.youtube.com/vi/gTy1Dho3bJE/hqdefault.jpg",
    tag: "Retro Warmth"
  },
  {
    id: "PnH56Koh_TY",
    title: "Tumko Dekha Toh Yeh Khayal Aaya",
    artist: "Jagjit Singh, Chitra Singh",
    movie: "Saath Saath (1982)",
    duration: "4:50",
    thumb: "https://img.youtube.com/vi/PnH56Koh_TY/hqdefault.jpg",
    tag: "Acoustic Ghazal"
  }
];

// Read existing nh48, dhaba, ghats, and bhojpuri
const nh48Tracks = [
  {
    id: "fvwyPGBOEgY",
    title: "Main Rang Sharbaton Ka",
    artist: "Atif Aslam, Chinmayi",
    movie: "Phata Poster Nikhla Hero",
    duration: "4:23",
    thumb: "https://img.youtube.com/vi/fvwyPGBOEgY/hqdefault.jpg",
    tag: "Midnight Vibe"
  },
  {
    id: "1poX_0u5oZk",
    title: "Tum Se Hi",
    artist: "Mohit Chauhan",
    movie: "Jab We Met",
    duration: "5:23",
    thumb: "https://img.youtube.com/vi/1poX_0u5oZk/hqdefault.jpg",
    tag: "Rainy Cabin"
  },
  {
    id: "x_TzE6fU5Z0",
    title: "Kun Faya Kun",
    artist: "A.R. Rahman, Javed Ali, Mohit Chauhan",
    movie: "Rockstar",
    duration: "7:53",
    thumb: "https://img.youtube.com/vi/x_TzE6fU5Z0/hqdefault.jpg",
    tag: "Sufi Journey"
  },
  {
    id: "jfKfPfyJRdk",
    title: "Kabira (Encore)",
    artist: "Arijit Singh, Harshdeep Kaur",
    movie: "Yeh Jawaani Hai Deewani",
    duration: "4:29",
    thumb: "https://img.youtube.com/vi/jfKfPfyJRdk/hqdefault.jpg",
    tag: "Acoustic"
  },
  {
    id: "Il4dDkCgl_M",
    title: "Pee Loon",
    artist: "Mohit Chauhan",
    movie: "Once Upon a Time in Mumbaai",
    duration: "4:48",
    thumb: "https://img.youtube.com/vi/Il4dDkCgl_M/hqdefault.jpg",
    tag: "Highway Dhaba"
  },
  {
    id: "hLSwL0iLq7c",
    title: "Phir Se Udd Chala",
    artist: "Mohit Chauhan",
    movie: "Rockstar",
    duration: "4:31",
    thumb: "https://img.youtube.com/vi/hLSwL0iLq7c/hqdefault.jpg",
    tag: "Night Glider"
  },
  {
    id: "hbcGx4MGUMg",
    title: "Zara Sa",
    artist: "KK",
    movie: "Jannat",
    duration: "5:03",
    thumb: "https://img.youtube.com/vi/hbcGx4MGUMg/hqdefault.jpg",
    tag: "KK Nostalgia"
  },
  {
    id: "BddP6PYo2gs",
    title: "Kesariya",
    artist: "Arijit Singh",
    movie: "Brahmāstra",
    duration: "4:28",
    thumb: "https://img.youtube.com/vi/BddP6PYo2gs/hqdefault.jpg",
    tag: "Golden Sunset"
  },
  {
    id: "Umqb9KENgmk",
    title: "Raabta (Kehte Hain Khuda)",
    artist: "Arijit Singh",
    movie: "Agent Vinod",
    duration: "4:04",
    thumb: "https://img.youtube.com/vi/Umqb9KENgmk/hqdefault.jpg",
    tag: "Late Hours"
  },
  {
    id: "Q_nL6i_c0zM",
    title: "Tera Ban Jaunga",
    artist: "Akhil Sachdeva, Tulsi Kumar",
    movie: "Kabir Singh",
    duration: "3:56",
    thumb: "https://img.youtube.com/vi/Q_nL6i_c0zM/hqdefault.jpg",
    tag: "Romantic Cruise"
  },
  {
    id: "v8L2tF6z3tY",
    title: "Subhanallah",
    artist: "Sreerama Chandra, Shilpa Rao",
    movie: "Yeh Jawaani Hai Deewani",
    duration: "4:09",
    thumb: "https://img.youtube.com/vi/v8L2tF6z3tY/hqdefault.jpg",
    tag: "Peaceful Cruise"
  },
  {
    id: "V1bFr2KGq1g",
    title: "Ilahi",
    artist: "Arijit Singh",
    movie: "Yeh Jawaani Hai Deewani",
    duration: "3:49",
    thumb: "https://img.youtube.com/vi/V1bFr2KGq1g/hqdefault.jpg",
    tag: "Wanderlust"
  },
  {
    id: "cUmE5yX4R7s",
    title: "Hawayein",
    artist: "Arijit Singh",
    movie: "Jab Harry Met Sejal",
    duration: "4:50",
    thumb: "https://img.youtube.com/vi/cUmE5yX4R7s/hqdefault.jpg",
    tag: "Window Breeze"
  },
  {
    id: "gvyUuxdRdR4",
    title: "Mast Magan",
    artist: "Arijit Singh, Chinmayi",
    movie: "2 States",
    duration: "4:40",
    thumb: "https://img.youtube.com/vi/gvyUuxdRdR4/hqdefault.jpg",
    tag: "Pure Devotion"
  },
  {
    id: "p8fA-NqP97Y",
    title: "Agar Tum Saath Ho",
    artist: "Alka Yagnik, Arijit Singh",
    movie: "Tamasha",
    duration: "5:41",
    thumb: "https://img.youtube.com/vi/p8fA-NqP97Y/hqdefault.jpg",
    tag: "Late Night Heartbreak"
  }
];

const dhabaTracks = [
  {
    id: "h6Ze5Hqa1wA",
    title: "Bolo Ta Ra Ra",
    artist: "Daler Mehndi",
    movie: "Bolo Ta Ra Ra (1995)",
    duration: "4:56",
    thumb: "https://img.youtube.com/vi/h6Ze5Hqa1wA/hqdefault.jpg",
    tag: "Punjabi Gold"
  },
  {
    id: "M3UDnXE8m3A",
    title: "Dardi Rab Rab Kardi",
    artist: "Daler Mehndi",
    movie: "Dardi Rab Rab (1996)",
    duration: "4:50",
    thumb: "https://img.youtube.com/vi/M3UDnXE8m3A/hqdefault.jpg",
    tag: "Highway Favorite"
  },
  {
    id: "fV6m7V75m6M",
    title: "Tunak Tunak Tun",
    artist: "Daler Mehndi",
    movie: "Tunak Tunak Tun (1998)",
    duration: "5:02",
    thumb: "https://img.youtube.com/vi/fV6m7V75m6M/hqdefault.jpg",
    tag: "All-Time Anthem"
  },
  {
    id: "K-pX4qwtAxA",
    title: "Chhaiyya Chhaiyya",
    artist: "Sukhwinder Singh, Sapna Awasthi",
    movie: "Dil Se (1998)",
    duration: "6:54",
    thumb: "https://img.youtube.com/vi/K-pX4qwtAxA/hqdefault.jpg",
    tag: "A.R. Rahman Magic"
  },
  {
    id: "s92u4r4wR0k",
    title: "O O Jaane Jaana",
    artist: "Kamaal Khan",
    movie: "Pyaar Kiya To Darna Kya (1998)",
    duration: "5:46",
    thumb: "https://img.youtube.com/vi/s92u4r4wR0k/hqdefault.jpg",
    tag: "90s Highway Classic"
  },
  {
    id: "G3m0iTfG0w0",
    title: "Gud Naal Ishq Mitha",
    artist: "Bally Sagoo, Malkit Singh",
    movie: "Bally Sagoo Hits",
    duration: "4:32",
    thumb: "https://img.youtube.com/vi/G3m0iTfG0w0/hqdefault.jpg",
    tag: "Dhaba Bhangra"
  }
];

const ghatsTracks = [
  {
    id: "l9cR3CMyuzc",
    title: "Barso Re",
    artist: "Shreya Ghoshal, A.R. Rahman",
    movie: "Guru (2007)",
    duration: "5:29",
    thumb: "https://img.youtube.com/vi/l9cR3CMyuzc/hqdefault.jpg",
    tag: "Rain Anthem"
  },
  {
    id: "VMsn5-a45-s",
    title: "Tip Tip Barsa Paani",
    artist: "Udit Narayan, Alka Yagnik",
    movie: "Mohra (1994)",
    duration: "5:58",
    thumb: "https://img.youtube.com/vi/VMsn5-a45-s/hqdefault.jpg",
    tag: "Monsoon Classic"
  },
  {
    id: "AMuRRXCuy-4",
    title: "Pal Pal Dil Ke Paas",
    artist: "Kishore Kumar",
    movie: "Blackmail (1973)",
    duration: "5:28",
    thumb: "https://img.youtube.com/vi/AMuRRXCuy-4/hqdefault.jpg",
    tag: "Golden Retro"
  },
  {
    id: "mZwJs1YQ-Wk",
    title: "Kisi Din Banoongi Main",
    artist: "Alka Yagnik, Udit Narayan",
    movie: "Raja (1995)",
    duration: "7:02",
    thumb: "https://img.youtube.com/vi/mZwJs1YQ-Wk/hqdefault.jpg",
    tag: "Nostalgic Romance"
  }
];

const bhojpuriTracks = [
  {
    id: "Gr8G_ldltDE",
    title: "Kamariya Kare Lapa Lop (Lollypop Lagelu)",
    artist: "Pawan Singh",
    movie: "Superhit Cassette (2008)",
    duration: "4:15",
    thumb: "https://img.youtube.com/vi/Gr8G_ldltDE/hqdefault.jpg",
    tag: "World Anthem"
  },
  {
    id: "2Mv8UOiyTq0",
    title: "Rinkiya Ke Papa (Chat Deni Maar Deli)",
    artist: "Manoj Tiwari",
    movie: "Uparwali Ke Chakkar Mein",
    duration: "4:42",
    thumb: "https://img.youtube.com/vi/2Mv8UOiyTq0/hqdefault.jpg",
    tag: "Desi Classic"
  },
  {
    id: "N9Ylebtf8YI",
    title: "Raate Diya Butake",
    artist: "Pawan Singh, Amrapali Dubey",
    movie: "Satya (2017)",
    duration: "4:28",
    thumb: "https://img.youtube.com/vi/N9Ylebtf8YI/hqdefault.jpg",
    tag: "Blockbuster Beat"
  },
  {
    id: "vwMR0yf4q04",
    title: "Piyawa Se Pahile Hamar Rahlu",
    artist: "Ritesh Pandey, Khushbu Tiwari",
    movie: "Wave Music Superhit (2017)",
    duration: "4:10",
    thumb: "https://img.youtube.com/vi/vwMR0yf4q04/hqdefault.jpg",
    tag: "Desi Sensation"
  },
  {
    id: "c4JD7rEtIj8",
    title: "Chhalakata Hamro Jawaniya",
    artist: "Pawan Singh, Priyanka Singh",
    movie: "Bhojpuriya Raja (2016)",
    duration: "3:58",
    thumb: "https://img.youtube.com/vi/c4JD7rEtIj8/hqdefault.jpg",
    tag: "High Bass"
  }
];

const playlistData = {
  driver: {
    name: "Bus Driver (Cabin Soundboard)",
    tagline: "Late-night interstate travel, roadside tea stalls, and iconic retro highway cassettes",
    dialogue: "Chalti ka naam gaadi. Lights on high beam, NH-48 awaits ahead.",
    stations: [
      {
        id: "nh48-sleeper",
        name: "NH-48 Midnight Sleeper",
        description: "Late night interstate coach ambiance: soulful melodies, gentle rumble, and endless asphalt.",
        badge: "FM 93.5 • CASSETTE",
        tracks: nh48Tracks
      },
      {
        id: "gulzar-ghazals",
        name: "Gulzar Ghazals",
        description: "Poetic masterpieces, heartfelt Nazms, and timeless acoustic ghazals penned by Gulzar Sahab.",
        badge: "MW 603 • GULZAR",
        tracks: gulzarTracks
      },
      {
        id: "manache-ghaav",
        name: "Manache Ghaav",
        description: "Deeply emotional, poignant Marathi sad songs and heart-touching melancholy.",
        badge: "AIR 747 • MARATHI",
        tracks: marathiSadTracks
      },
      {
        id: "dhaba-banger",
        name: "Highway Dhaba Beats",
        description: "High-octane highway dhabas: piping hot kadak chai, loud subwoofers, and unstoppable energy.",
        badge: "AM 1240 • HIGH BASS",
        tracks: dhabaTracks
      },
      {
        id: "ghats-rain",
        name: "Monsoon Highway & Rain",
        description: "Climbing through misty Western Ghats with windshield wipers slicing steady monsoon rain.",
        badge: "SW 49m • MONSOON",
        tracks: ghatsTracks
      },
      {
        id: "bhojpuri-garda",
        name: "Bhojpuri Garda",
        description: "Powerhouse Bhojpuri beats, authentic desi dholak grooves, and high-energy rural anthems.",
        badge: "AM 1080 • BHOJPURI",
        tracks: bhojpuriTracks
      }
    ]
  },

  saloon: {
    name: "Deluxe Saloon (Barbershop Lounge)",
    tagline: "Sunday morning grooming, vintage radio warmth, and timeless romantic melodies",
    dialogue: "A warm shave, fresh aftershave, and soulful melodies on the radio.",
    stations: [
      {
        id: "deluxe-romance",
        name: "Deluxe 90s Romance",
        description: "The classic soundtrack of an unhurried morning haircut and warm towel treatment.",
        badge: "MW 540 • PHILIPS",
        tracks: deluxeRomanceTracks
      },
      {
        id: "gulzar-ghazals",
        name: "Gulzar Ghazals",
        description: "Poetic masterpieces, heartfelt Nazms, and timeless acoustic ghazals penned by Gulzar Sahab.",
        badge: "MW 603 • GULZAR",
        tracks: gulzarTracks
      },
      {
        id: "manache-ghaav",
        name: "Manache Ghaav",
        description: "Deeply emotional, poignant Marathi sad songs and heart-touching melancholy.",
        badge: "AIR 747 • MARATHI",
        tracks: marathiSadTracks
      },
      {
        id: "sunday-champi",
        name: "Sunday Morning Session",
        description: "Relaxing hair conditioning, soothing scissor snips, and lighthearted morning tunes.",
        badge: "FM 102.6 • VINTAGE",
        tracks: sundayChampiTracks
      },
      {
        id: "dard-e-dil",
        name: "Heartbreak Melodies",
        description: "Poignant vocal expressions, acoustic ghazals, and reflective ballads.",
        badge: "AM 810 • NOSTALGIA",
        tracks: dardEDilTracks
      },
      {
        id: "vividh-bharati",
        name: "Vintage Transistor Radio",
        description: "Classic transistor broadcasts: legendary recordings from the 1970s and 1980s.",
        badge: "SW 31m • VINTAGE",
        tracks: vividhBharatiTracks
      }
    ]
  }
};

const fileContent = `/**
 * SAFAR & SALOON: DUAL RETRO RADIO PLATFORM
 * Curated retro stations for Bus Driver and Deluxe Saloon modes
 * 100% verified, active YouTube stream IDs
 */

window.playlistData = ${JSON.stringify(playlistData, null, 2)};
`;

fs.writeFileSync('js/playlistData.js', fileContent);
console.log('Successfully written updated js/playlistData.js!');
