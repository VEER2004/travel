import mongoose from 'mongoose';
import Tour from '../models/Tour.js';
import dotenv from 'dotenv';

dotenv.config();

const createTours = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Sample tours data
    const tours = [
      {
        title: 'Bali Island Tour',
        city: 'Bali',
        address: 'Kuta Beach, Bali',
        distance: 300,
        price: 99,
        maxGroupSize: 10,
        desc: 'Experience the beauty of Bali with our comprehensive tour package. Visit famous temples, pristine beaches, and immerse yourself in the rich culture.',
        reviews: [],
        photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        featured: true
      },
      {
        title: 'Paris City Tour',
        city: 'Paris',
        address: 'Eiffel Tower, Paris',
        distance: 500,
        price: 149,
        maxGroupSize: 15,
        desc: 'Discover the magic of Paris with our guided city tour. Visit iconic landmarks, enjoy French cuisine, and experience the city of love.',
        reviews: [],
        photo: 'https://images.unsplash.com/photo-1502601938659-0a9bf7a1d9c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        featured: true
      },
      {
        title: 'Tokyo Adventure',
        city: 'Tokyo',
        address: 'Shibuya Crossing, Tokyo',
        distance: 800,
        price: 199,
        maxGroupSize: 12,
        desc: 'Explore the vibrant city of Tokyo with our adventure tour. Visit traditional temples, modern districts, and experience Japanese culture.',
        reviews: [],
        photo: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        featured: true
      },
      {
        title: 'New York City Explorer',
        city: 'New York',
        address: 'Times Square, NYC',
        distance: 400,
        price: 129,
        maxGroupSize: 20,
        desc: 'Experience the energy of New York City with our comprehensive tour. Visit famous landmarks, museums, and enjoy the city that never sleeps.',
        reviews: [],
        photo: 'https://images.unsplash.com/photo-1496442226666-8d4e0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        featured: true
      },
      {
        title: 'Dubai Desert Safari',
        city: 'Dubai',
        address: 'Dubai Desert Conservation Reserve',
        distance: 600,
        price: 179,
        maxGroupSize: 15,
        desc: 'Experience the thrill of desert safari in Dubai. Enjoy dune bashing, camel riding, and traditional Arabian entertainment under the stars.',
        reviews: [],
        photo: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        featured: true
      },
      {
        title: 'Sydney Harbour Cruise',
        city: 'Sydney',
        address: 'Circular Quay, Sydney',
        distance: 200,
        price: 89,
        maxGroupSize: 30,
        desc: 'Cruise through Sydney Harbour and witness the iconic Opera House and Harbour Bridge. Enjoy a delicious lunch while taking in the stunning views.',
        reviews: [],
        photo: 'https://images.unsplash.com/photo-1509373909648-686d8fb7f6e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        featured: true
      },
      {
        title: 'Santorini Sunset Tour',
        city: 'Santorini',
        address: 'Oia, Santorini',
        distance: 150,
        price: 159,
        maxGroupSize: 12,
        desc: 'Witness the world-famous sunset in Oia, Santorini. Explore white-washed buildings, blue-domed churches, and enjoy local Greek cuisine.',
        reviews: [],
        photo: 'https://images.unsplash.com/photo-1613395877347-5fb8e62d48e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        featured: true
      },
      {
        title: 'Machu Picchu Trek',
        city: 'Cusco',
        address: 'Machu Picchu, Peru',
        distance: 1000,
        price: 299,
        maxGroupSize: 10,
        desc: 'Embark on an unforgettable journey to the ancient Incan city of Machu Picchu. Trek through the Andes and discover the mysteries of this UNESCO World Heritage site.',
        reviews: [],
        photo: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        featured: true
      },
      {
        title: 'Northern Lights Tour',
        city: 'Reykjavik',
        address: 'Iceland',
        distance: 1200,
        price: 249,
        maxGroupSize: 8,
        desc: 'Chase the mesmerizing Northern Lights in Iceland. Experience the magic of the Aurora Borealis while enjoying Iceland\'s unique landscapes and hot springs.',
        reviews: [],
        photo: 'https://images.unsplash.com/photo-1483349646190-0ef80ae26d10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        featured: true
      },
      {
        title: 'Great Barrier Reef Dive',
        city: 'Cairns',
        address: 'Great Barrier Reef, Australia',
        distance: 400,
        price: 199,
        maxGroupSize: 16,
        desc: 'Dive into the world\'s largest coral reef system. Experience the vibrant marine life, colorful corals, and crystal-clear waters of the Great Barrier Reef.',
        reviews: [],
        photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        featured: true
      },
      {
        title: 'African Safari Adventure',
        city: 'Nairobi',
        address: 'Masai Mara National Reserve',
        distance: 1500,
        price: 399,
        maxGroupSize: 12,
        desc: 'Experience the ultimate African safari in the Masai Mara. Witness the Big Five, traditional Maasai culture, and the stunning African savanna.',
        reviews: [],
        photo: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        featured: true
      },
      {
        title: 'Venice Gondola Tour',
        city: 'Venice',
        address: 'Grand Canal, Venice',
        distance: 300,
        price: 129,
        maxGroupSize: 6,
        desc: 'Glide through the romantic canals of Venice in a traditional gondola. Experience the charm of this historic city and its unique water-based transportation.',
        reviews: [],
        photo: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        featured: true
      },
      {
        title: 'Petra Ancient City Tour',
        city: 'Petra',
        address: 'Petra Archaeological Park',
        distance: 800,
        price: 179,
        maxGroupSize: 15,
        desc: 'Explore the ancient Nabatean city of Petra. Walk through the narrow Siq, discover the Treasury, and learn about this UNESCO World Heritage site.',
        reviews: [],
        photo: 'https://images.unsplash.com/photo-1544735716-392fe248d93a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        featured: true
      },
      {
        title: 'Swiss Alps Adventure',
        city: 'Zermatt',
        address: 'Matterhorn, Switzerland',
        distance: 900,
        price: 249,
        maxGroupSize: 10,
        desc: 'Experience the majesty of the Swiss Alps. Visit the iconic Matterhorn, enjoy skiing or hiking, and take in the breathtaking mountain views.',
        reviews: [],
        photo: 'https://images.unsplash.com/photo-1506906731070-4175781e71f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        featured: true
      }
    ];

    // Clear existing tours
    await Tour.deleteMany({});
    console.log('Cleared existing tours');

    // Insert new tours
    const result = await Tour.insertMany(tours);
    console.log(`${result.length} tours created successfully`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createTours(); 