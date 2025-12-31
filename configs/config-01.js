// Configuration file for easy content management
const CONFIG = {
    // Site settings
    logo: '../images/logo.png',
    title: 'Mukah XR Explorer',
    
    // 3D Model settings
    model: {
        src: '../models/jerunei_sgmisan.glb',
        alt: '3D Model',
        poster: '../thumbnails/jerunei_sgmisan.png'
    },
    
    // Content sections
    content: {
        home: {
            href: 'jerunei_sgmisan.html',
            available: false,
            title: 'Welcome to Mukah XR Explorer',
            description: 'Explore interactive 3D models with rich multimedia content. Navigate through our collection using the menu above.'
        },
        
        audio: {
            available: true,
            items: [
                {
                    title: 'Sample Audio Track 1',
                    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
                },
                {
                    title: 'Sample Audio Track 2',
                    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
                }
            ]
        },
        
        video: {
            available: true,
            items: [
                {
                    title: 'YouTube Video Example',
                    type: 'youtube',
                    url: 'dQw4w9WgXcQ' // YouTube video ID
                },
                {
                    title: 'Direct MP4 Video',
                    type: 'mp4',
                    url: 'https://www.w3schools.com/html/mov_bbb.mp4'
                }
            ]
        },
        
        images: {
            available: true,
            items: [
                {
                    title: 'Gallery Image 1',
                    url: 'https://via.placeholder.com/800x600/FF6B6B/FFFFFF?text=Image+1'
                },
                {
                    title: 'Gallery Image 2',
                    url: 'https://via.placeholder.com/800x600/4ECDC4/FFFFFF?text=Image+2'
                },
                {
                    title: 'Gallery Image 3',
                    url: 'https://via.placeholder.com/800x600/45B7D1/FFFFFF?text=Image+3'
                },
                {
                    title: 'Gallery Image 4',
                    url: 'https://via.placeholder.com/800x600/96CEB4/FFFFFF?text=Image+4'
                }
            ]
        },
        
        articles: {
            available: false, // Set to true when you have articles
            items: [
                // Example:
                // {
                //     title: 'Article Title',
                //     type: 'pdf', // or 'txt'
                //     url: 'path/to/article.pdf'
                // }
            ]
        },
        
        quiz: {
            available: true,
            title: '3D Modeling Knowledge Quiz',
            questions: [
                {
                    question: 'What does 3D modeling stand for?',
                    options: [
                        'Three Dimensional',
                        'Triple Display',
                        'Tri-Data',
                        'Third Degree'
                    ],
                    correct: 0
                },
                {
                    question: 'Which file format is commonly used for 3D models on the web?',
                    options: [
                        'DOC',
                        'GLB',
                        'MP3',
                        'PDF'
                    ],
                    correct: 1
                },
                {
                    question: 'What technology allows 3D models to be viewed in a web browser?',
                    options: [
                        'WebGL',
                        'Flash',
                        'Java',
                        'Silverlight'
                    ],
                    correct: 0
                }
            ]
        }
    }
};

// Instructions for managing content:
/*
1. To change the logo: Update CONFIG.logo with your image URL
2. To change the title: Update CONFIG.title
3. To change the 3D model: Update CONFIG.model.src and CONFIG.model.poster
4. To add/remove content:
   - Set 'available' to false to show 404 error
   - Add items to the 'items' array for audio, video, images, articles
5. For videos:
   - YouTube: type = 'youtube', url = video ID (not full URL)
   - MP4: type = 'mp4', url = full video URL
6. For quiz:
   - Add questions to the questions array
   - 'correct' is the index of the correct option (0-based)
*/