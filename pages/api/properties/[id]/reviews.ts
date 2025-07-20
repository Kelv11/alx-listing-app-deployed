import type { NextApiRequest, NextApiResponse } from "next";

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    comment:
      "Absolutely amazing property! The location was perfect and the amenities were top-notch. Highly recommend!",
    date: "2024-01-15",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4,
    comment:
      "Great stay overall. The property was clean and well-maintained. The only minor issue was the WiFi speed.",
    date: "2024-01-10",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    comment:
      "Perfect vacation spot! The views were breathtaking and the host was very responsive. Will definitely return!",
    date: "2024-01-05",
  },
  {
    id: "4",
    name: "David Thompson",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 4,
    comment:
      "Excellent property with great amenities. The location was convenient and the neighborhood was quiet.",
    date: "2023-12-28",
  },
  {
    id: "5",
    name: "Lisa Wang",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    comment:
      "This place exceeded all our expectations! The design was beautiful and everything was immaculate.",
    date: "2023-12-20",
  },
  {
    id: "6",
    name: "James Wilson",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 4,
    comment:
      "Very comfortable stay. The property had everything we needed and the check-in process was smooth.",
    date: "2023-12-15",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Return mock reviews for any property ID
  // In a real app, you would filter reviews by property ID using req.query.id
  res.status(200).json(mockReviews);
}
