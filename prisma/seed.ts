import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create users
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@digitalhubs.org',
      role: 'admin',
      phone: '+1234567890',
    },
  })

  const manager1 = await prisma.user.create({
    data: {
      name: 'John Manager',
      email: 'john@digitalhubs.org',
      role: 'manager',
      phone: '+1234567891',
    },
  })

  const manager2 = await prisma.user.create({
    data: {
      name: 'Sarah Wilson',
      email: 'sarah@digitalhubs.org',
      role: 'manager',
      phone: '+1234567892',
    },
  })

  // Create digital hubs
  const hub1 = await prisma.digitalHub.create({
    data: {
      name: 'Lagos Tech Hub',
      location: 'Lagos, Nigeria',
      latitude: 6.5244,
      longitude: 3.3792,
      managerId: manager1.id,
      status: 'active',
      description: 'Main technology hub serving Lagos metropolitan area',
    },
  })

  const hub2 = await prisma.digitalHub.create({
    data: {
      name: 'Abuja Innovation Center',
      location: 'Abuja, Nigeria',
      latitude: 9.0765,
      longitude: 7.3986,
      managerId: manager2.id,
      status: 'active',
      description: 'Government district digital skills center',
    },
  })

  const hub3 = await prisma.digitalHub.create({
    data: {
      name: 'Kano Digital Hub',
      location: 'Kano, Nigeria',
      latitude: 12.0022,
      longitude: 8.5920,
      managerId: manager1.id,
      status: 'maintenance',
      description: 'Northern Nigeria regional hub',
    },
  })

  const hub4 = await prisma.digitalHub.create({
    data: {
      name: 'Port Harcourt Tech Center',
      location: 'Port Harcourt, Nigeria',
      latitude: 4.8156,
      longitude: 7.0498,
      status: 'active',
      description: 'Oil city technology and entrepreneurship hub',
    },
  })

  const hub5 = await prisma.digitalHub.create({
    data: {
      name: 'Ibadan Skills Hub',
      location: 'Ibadan, Nigeria',
      latitude: 7.3775,
      longitude: 3.9470,
      managerId: manager2.id,
      status: 'active',
      description: 'Academic city digital literacy center',
    },
  })

  // Create assets
  const assets = [
    { name: 'Dell Desktop 1', type: 'computer', hubId: hub1.id, model: 'Dell OptiPlex 3080', serialNumber: 'DL001', status: 'active' },
    { name: 'Dell Desktop 2', type: 'computer', hubId: hub1.id, model: 'Dell OptiPlex 3080', serialNumber: 'DL002', status: 'active' },
    { name: 'HP Laptop 1', type: 'laptop', hubId: hub1.id, model: 'HP ProBook 450', serialNumber: 'HP001', status: 'active' },
    { name: 'Cisco Router', type: 'router', hubId: hub1.id, model: 'Cisco ISR 4331', serialNumber: 'CS001', status: 'active' },
    { name: 'HP Printer', type: 'printer', hubId: hub1.id, model: 'HP LaserJet Pro', serialNumber: 'HP002', status: 'maintenance' },
    
    { name: 'Lenovo Desktop 1', type: 'computer', hubId: hub2.id, model: 'Lenovo ThinkCentre', serialNumber: 'LN001', status: 'active' },
    { name: 'Lenovo Desktop 2', type: 'computer', hubId: hub2.id, model: 'Lenovo ThinkCentre', serialNumber: 'LN002', status: 'active' },
    { name: 'TP-Link Router', type: 'router', hubId: hub2.id, model: 'TP-Link Archer', serialNumber: 'TP001', status: 'active' },
    { name: 'Epson Projector', type: 'projector', hubId: hub2.id, model: 'Epson PowerLite', serialNumber: 'EP001', status: 'active' },
    
    { name: 'Acer Desktop 1', type: 'computer', hubId: hub3.id, model: 'Acer Veriton', serialNumber: 'AC001', status: 'broken' },
    { name: 'Acer Desktop 2', type: 'computer', hubId: hub3.id, model: 'Acer Veriton', serialNumber: 'AC002', status: 'maintenance' },
    { name: 'Netgear Router', type: 'router', hubId: hub3.id, model: 'Netgear Nighthawk', serialNumber: 'NG001', status: 'active' },
    
    { name: 'ASUS Desktop 1', type: 'computer', hubId: hub4.id, model: 'ASUS VivoPC', serialNumber: 'AS001', status: 'active' },
    { name: 'ASUS Desktop 2', type: 'computer', hubId: hub4.id, model: 'ASUS VivoPC', serialNumber: 'AS002', status: 'active' },
    { name: 'Canon Printer', type: 'printer', hubId: hub4.id, model: 'Canon PIXMA', serialNumber: 'CN001', status: 'active' },
    
    { name: 'MSI Desktop 1', type: 'computer', hubId: hub5.id, model: 'MSI Cubi', serialNumber: 'MS001', status: 'active' },
    { name: 'MSI Desktop 2', type: 'computer', hubId: hub5.id, model: 'MSI Cubi', serialNumber: 'MS002', status: 'active' },
    { name: 'D-Link Router', type: 'router', hubId: hub5.id, model: 'D-Link DIR-878', serialNumber: 'DL003', status: 'active' },
  ]

  for (const asset of assets) {
    await prisma.asset.create({ data: asset })
  }

  // Create impact metrics
  const impactMetrics = [
    {
      hubId: hub1.id,
      youthsTrained: 150,
      youthsEarning: 120,
      impactStories: 8,
      skillsOffered: 'Web Development, Digital Marketing, Graphic Design',
      ageGroup: '18-25',
      gender: 'mixed',
      period: 'monthly',
    },
    {
      hubId: hub1.id,
      youthsTrained: 180,
      youthsEarning: 140,
      impactStories: 12,
      skillsOffered: 'Web Development, Digital Marketing, Graphic Design',
      ageGroup: '26-35',
      gender: 'mixed',
      period: 'monthly',
    },
    {
      hubId: hub2.id,
      youthsTrained: 120,
      youthsEarning: 85,
      impactStories: 6,
      skillsOffered: 'Data Analysis, Programming, Digital Literacy',
      ageGroup: '18-25',
      gender: 'female',
      period: 'monthly',
    },
    {
      hubId: hub2.id,
      youthsTrained: 95,
      youthsEarning: 70,
      impactStories: 4,
      skillsOffered: 'Data Analysis, Programming, Digital Literacy',
      ageGroup: '26-35',
      gender: 'male',
      period: 'monthly',
    },
    {
      hubId: hub4.id,
      youthsTrained: 200,
      youthsEarning: 160,
      impactStories: 15,
      skillsOffered: 'E-commerce, Mobile App Development, Cybersecurity',
      ageGroup: '18-25',
      gender: 'mixed',
      period: 'monthly',
    },
    {
      hubId: hub5.id,
      youthsTrained: 175,
      youthsEarning: 130,
      impactStories: 10,
      skillsOffered: 'AI/ML, Cloud Computing, DevOps',
      ageGroup: '26-35',
      gender: 'mixed',
      period: 'monthly',
    },
    // Quarterly data
    {
      youthsTrained: 2500,
      youthsEarning: 1800,
      impactStories: 85,
      skillsOffered: 'Comprehensive Digital Skills Program',
      ageGroup: '18-25',
      gender: 'mixed',
      period: 'quarterly',
    },
    {
      youthsTrained: 1800,
      youthsEarning: 1200,
      impactStories: 65,
      skillsOffered: 'Advanced Technical Training',
      ageGroup: '26-35',
      gender: 'mixed',
      period: 'quarterly',
    },
  ]

  for (const metric of impactMetrics) {
    await prisma.impactMetric.create({ data: metric })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
