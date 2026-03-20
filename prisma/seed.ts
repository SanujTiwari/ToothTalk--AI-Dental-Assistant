import { PrismaClient, Gender } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding doctors...");

  // Clear existing doctors first
  await prisma.doctor.deleteMany();

  const doctors = await prisma.doctor.createMany({
    data: [
      {
        name: "Dr. Sarah Mitchell",
        email: "sarah.mitchell@toothtalk.com",
        phone: "+1-555-0101",
        speciality: "General Dentistry",
        bio: "Dr. Mitchell has 12 years of experience in general dentistry, specializing in preventive care and patient comfort.",
        imageUrl: "https://avatar.iran.liara.run/public/girl?username=sarah",
        gender: Gender.FEMALE,
        isActive: true,
      },
      {
        name: "Dr. James Carter",
        email: "james.carter@toothtalk.com",
        phone: "+1-555-0102",
        speciality: "Orthodontics",
        bio: "Dr. Carter is a board-certified orthodontist with expertise in Invisalign and traditional braces for all ages.",
        imageUrl: "https://avatar.iran.liara.run/public/boy?username=james",
        gender: Gender.MALE,
        isActive: true,
      },
      {
        name: "Dr. Priya Patel",
        email: "priya.patel@toothtalk.com",
        phone: "+1-555-0103",
        speciality: "Cosmetic Dentistry",
        bio: "Dr. Patel specializes in smile makeovers including teeth whitening, veneers, and dental bonding.",
        imageUrl: "https://avatar.iran.liara.run/public/girl?username=priya",
        gender: Gender.FEMALE,
        isActive: true,
      },
      {
        name: "Dr. Michael Torres",
        email: "michael.torres@toothtalk.com",
        phone: "+1-555-0104",
        speciality: "Oral Surgery",
        bio: "Dr. Torres has over 15 years of experience in oral and maxillofacial surgery including wisdom tooth extraction.",
        imageUrl: "https://avatar.iran.liara.run/public/boy?username=michael",
        gender: Gender.MALE,
        isActive: true,
      },
      {
        name: "Dr. Emily Chen",
        email: "emily.chen@toothtalk.com",
        phone: "+1-555-0105",
        speciality: "Pediatric Dentistry",
        bio: "Dr. Chen is passionate about making dental visits fun and stress-free for children of all ages.",
        imageUrl: "https://avatar.iran.liara.run/public/girl?username=emily",
        gender: Gender.FEMALE,
        isActive: true,
      },
      {
        name: "Dr. David Kim",
        email: "david.kim@toothtalk.com",
        phone: "+1-555-0106",
        speciality: "Endodontics",
        bio: "Dr. Kim specializes in root canal therapy and saving teeth that would otherwise need extraction.",
        imageUrl: "https://avatar.iran.liara.run/public/boy?username=david",
        gender: Gender.MALE,
        isActive: true,
      },
    ],
  });

  console.log(`✅ Seeded ${doctors.count} doctors successfully!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
