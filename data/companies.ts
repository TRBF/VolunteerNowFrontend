const companies = [
    {
        name: "UNICEF",
        username: "unicef",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-04-15T08:00:00Z')
    },
    {
        name: "Salvati copiii",
        username: "salvati.copiii",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-01-10T10:00:00Z')
    },
    {
        name: "UE",
        username: "uniunea.europeana",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2023-12-05T12:30:00Z')
    },
    {
        name: "UNESCO",
        username: "UNESCO",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2023-11-20T14:00:00Z')
    },
    {
        name: "Red Cross",
        username: "redcross",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-03-25T09:45:00Z')
    },
    {
        name: "World Wildlife Fund",
        username: "worldwildlifefund",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-02-28T13:15:00Z')
    },
    {
        name: "Greenpeace",
        username: "greenpeace",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-04-05T16:00:00Z')
    },
    {
        name: "Doctors Without Borders",
        username: "doctorswithoutborders",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2023-12-15T11:00:00Z')
    },
    {
        name: "Amnesty International",
        username: "amnesty",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-01-20T15:30:00Z')
    },
    {
        name: "Oxfam",
        username: "oxfam",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-03-10T10:45:00Z')
    },
    {
        name: "Habitat for Humanity",
        username: "habitatforhumanity",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-02-05T14:15:00Z')
    },
    {
        name: "Feeding America",
        username: "feedingamerica",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2023-11-10T09:00:00Z')
    },
    {
        name: "The Nature Conservancy",
        username: "natureconservancy",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-03-20T12:00:00Z')
    },
    {
        name: "International Committee of the Red Cross",
        username: "icrc",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2023-12-25T08:30:00Z')
    },
    {
        name: "Action Against Hunger",
        username: "actionagainsthunger",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-01-30T17:45:00Z')
    },
    {
        name: "CARE",
        username: "care",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-04-10T13:00:00Z')
    },
    {
        name: "Mercy Corps",
        username: "mercycorps",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-02-25T11:30:00Z')
    },
    {
        name: "International Rescue Committee",
        username: "rescueorg",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-01-05T16:15:00Z')
    },
    {
        name: "Water.org",
        username: "water",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2023-12-01T08:45:00Z')
    },
    {
        name: "The Hunger Project",
        username: "hungerproject",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-03-05T15:00:00Z')
    },
    {
        name: "The Carter Center",
        username: "cartercenter",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-02-10T09:15:00Z')
    },
    {
        name: "The Trevor Project",
        username: "trevorproject",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-01-25T12:30:00Z')
    },
    {
        name: "Teach For America",
        username: "teachforamerica",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2023-11-15T17:45:00Z')
    },
    {
        name: "Teach for All",
        username: "teachforall",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-03-30T08:30:00Z')
    },
    {
        name: "Thrive Global",
        username: "thriveglobal",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2023-12-20T10:00:00Z')
    },
    {
        name: "To Write Love on Her Arms",
        username: "twloha",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-01-15T14:45:00Z')
    },
    {
        name: "Tomorrowland Foundation",
        username: "tomorrowlandfoundation",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-04-20T11:15:00Z')
    },
    {
        name: "WaterAid",
        username: "wateraid",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2023-11-25T09:30:00Z')
    },
    {
        name: "Water for People",
        username: "waterforpeople",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-02-15T13:00:00Z')
    },
    {
        name: "Wildlife Conservation Society",
        username: "wcs",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-03-15T15:30:00Z')
    },
    {
        name: "World Food Programme",
        username: "wfp",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-04-01T10:45:00Z')
    },
    {
        name: "World Vision",
        username: "worldvision",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2023-12-30T12:00:00Z')
    },
    {
        name: "Women for Women International",
        username: "womenforwomen",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-01-01T16:15:00Z')
    },
    {
        name: "We Charity",
        username: "wecharity",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-03-25T14:00:00Z')
    },
    {
        name: "WildAid",
        username: "wildaid",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-04-15T08:45:00Z')
    },
    {
        name: "World Resources Institute",
        username: "worldresourcesinstitute",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-02-01T11:00:00Z')
    },
    {
        name: "World Wildlife Fund",
        username: "worldwildlifefund",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-01-20T12:30:00Z')
    },
    {
        name: "World Health Organization",
        username: "who",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2023-11-10T09:15:00Z')
    },
    {
        name: "World Concern",
        username: "worldconcern",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2024-03-05T17:00:00Z')
    },
    {
        name: "World Animal Protection",
        username: "worldanimalprotection",
        profilePicture: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2024/02/13/3885465-78942228-2560-1440.jpg",
        date: Date.parse('2023-12-15T14:30:00Z')
    }
];



export default companies;
