/* ============================================
   Nikki Nails Bar & Spa — Data Store
   LocalStorage persistence layer for
   appointments, walk-ins, staff, and customers.
   ============================================ */

const Store = (() => {

  /* ---------- Core Helpers ---------- */
  function get(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function genId(prefix) {
    return prefix + '-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
  }

  /* ---------- Services Catalog ---------- */
  const SERVICES = [
    // Manicure
    { id: 'SVC-MANI-01', category: 'Manicure', name: 'Classic Manicure', duration: 30, price: 22, description: 'Shape, cuticle care & polish' },
    { id: 'SVC-MANI-02', category: 'Manicure', name: 'Gel Manicure', duration: 45, price: 35, description: 'Long-lasting gel color, chip-free up to 3 weeks' },
    { id: 'SVC-MANI-03', category: 'Manicure', name: 'Dip Powder Manicure', duration: 60, price: 45, description: 'Durable dip powder for extra strength & shine' },
    { id: 'SVC-MANI-04', category: 'Manicure', name: 'Acrylic Full Set', duration: 75, price: 55, description: 'Full set of acrylic enhancements' },
    { id: 'SVC-MANI-05', category: 'Manicure', name: 'Acrylic Fill', duration: 45, price: 38, description: 'Two-week acrylic maintenance fill' },
    { id: 'SVC-MANI-06', category: 'Manicure', name: 'Gel-X Full Set', duration: 60, price: 60, description: 'Apres Gel-X soft gel nail extensions' },
    // Pedicure
    { id: 'SVC-PEDI-01', category: 'Pedicure', name: 'Classic Pedicure', duration: 40, price: 28, description: 'Soak, exfoliate, trim & polish' },
    { id: 'SVC-PEDI-02', category: 'Pedicure', name: 'Spa Pedicure', duration: 55, price: 42, description: 'Classic + mask, massage & paraffin dip' },
    { id: 'SVC-PEDI-03', category: 'Pedicure', name: 'Deluxe Pedicure', duration: 70, price: 58, description: 'Full spa treatment with hot stone massage' },
    { id: 'SVC-PEDI-04', category: 'Pedicure', name: 'Gel Pedicure', duration: 50, price: 45, description: 'Classic pedicure with gel polish finish' },
    // Nail Art
    { id: 'SVC-ART-01', category: 'Nail Art', name: 'Simple Nail Art', duration: 20, price: 10, description: 'One design per nail (dots, lines, basic shapes) — add-on' },
    { id: 'SVC-ART-02', category: 'Nail Art', name: 'Medium Nail Art', duration: 30, price: 18, description: 'Floral, ombre, gradient — add-on per set' },
    { id: 'SVC-ART-03', category: 'Nail Art', name: 'Complex Nail Art', duration: 45, price: 28, description: 'Intricate designs, hand-painted art — add-on per set' },
    { id: 'SVC-ART-04', category: 'Nail Art', name: '3D Nail Art', duration: 60, price: 40, description: 'Gems, crystals, 3D floral embellishments' },
    { id: 'SVC-ART-05', category: 'Nail Art', name: 'Chrome Powder', duration: 15, price: 12, description: 'Mirror chrome finish — add-on' },
    // Spa Treatments
    { id: 'SVC-SPA-01', category: 'Spa Treatments', name: 'Paraffin Wax (Hands)', duration: 15, price: 12, description: 'Moisturizing paraffin wax dip for hands — add-on' },
    { id: 'SVC-SPA-02', category: 'Spa Treatments', name: 'Paraffin Wax (Feet)', duration: 15, price: 12, description: 'Moisturizing paraffin wax dip for feet — add-on' },
    { id: 'SVC-SPA-03', category: 'Spa Treatments', name: 'Hot Stone Massage', duration: 20, price: 18, description: 'Relaxing hot stone foot and leg massage — add-on' },
    { id: 'SVC-SPA-04', category: 'Spa Treatments', name: 'Hand & Arm Massage', duration: 20, price: 15, description: 'Extended hand and arm relaxation massage — add-on' },
    // Waxing
    { id: 'SVC-WAX-01', category: 'Waxing', name: 'Eyebrow Wax', duration: 15, price: 14, description: 'Shape and define brows with wax' },
    { id: 'SVC-WAX-02', category: 'Waxing', name: 'Lip Wax', duration: 10, price: 10, description: 'Upper lip wax' },
    { id: 'SVC-WAX-03', category: 'Waxing', name: 'Full Face Wax', duration: 30, price: 32, description: 'Brows, lip, chin and cheeks' },
    // Combos
    { id: 'SVC-CMB-01', category: 'Combo Packages', name: 'Mani + Pedi Combo', duration: 75, price: 48, description: 'Classic manicure & classic pedicure' },
    { id: 'SVC-CMB-02', category: 'Combo Packages', name: 'Gel Mani + Spa Pedi', duration: 100, price: 72, description: 'Gel manicure & spa pedicure' },
    { id: 'SVC-CMB-03', category: 'Combo Packages', name: 'Pamper Package', duration: 120, price: 95, description: 'Gel mani, deluxe pedi & eyebrow wax' }
  ];

  function getServices() { return SERVICES; }
  function getServiceById(id) { return SERVICES.find(s => s.id === id) || null; }
  function getServiceCategories() { return [...new Set(SERVICES.map(s => s.category))]; }

  /* ---------- Staff ---------- */
  function getStaff() {
    return get('nn_staff') || [];
  }

  function saveStaff(staff) {
    set('nn_staff', staff);
  }

  function updateStaffStatus(staffId, status) {
    const staff = getStaff();
    const member = staff.find(s => s.id === staffId);
    if (member) {
      member.status = status;
      member.updatedAt = new Date().toISOString();
      saveStaff(staff);
    }
    return member;
  }

  /* ---------- Appointments ---------- */
  function getAppointments() {
    return get('nn_appointments') || [];
  }

  function addAppointment(apt) {
    const appointments = getAppointments();
    apt.id = genId('APT');
    apt.status = apt.status || 'confirmed';
    apt.createdAt = new Date().toISOString();
    appointments.push(apt);
    set('nn_appointments', appointments);
    return apt;
  }

  function updateAppointment(aptId, updates) {
    const appointments = getAppointments();
    const idx = appointments.findIndex(a => a.id === aptId);
    if (idx !== -1) {
      appointments[idx] = { ...appointments[idx], ...updates, updatedAt: new Date().toISOString() };
      set('nn_appointments', appointments);
      return appointments[idx];
    }
    return null;
  }

  function getAppointmentsByDate(date) {
    return getAppointments().filter(a => a.date === date);
  }

  function findAppointment(aptId) {
    return getAppointments().find(a => a.id === aptId) || null;
  }

  function getAppointmentsByPhone(phone) {
    const normalized = phone.replace(/\D/g, '');
    return getAppointments().filter(a => a.phone.replace(/\D/g, '') === normalized);
  }

  /* ---------- Walk-ins (Queue) ---------- */
  function getWalkins() {
    return get('nn_walkins') || [];
  }

  function addWalkin(walkin) {
    const walkins = getWalkins();
    const waiting = walkins.filter(w => w.status === 'waiting');
    walkin.id = genId('WLK');
    walkin.status = 'waiting';
    walkin.position = waiting.length + 1;
    walkin.checkInTime = new Date().toISOString();
    walkins.push(walkin);
    set('nn_walkins', walkins);
    return walkin;
  }

  function updateWalkin(walkinId, updates) {
    const walkins = getWalkins();
    const idx = walkins.findIndex(w => w.id === walkinId);
    if (idx !== -1) {
      walkins[idx] = { ...walkins[idx], ...updates, updatedAt: new Date().toISOString() };
      set('nn_walkins', walkins);
      return walkins[idx];
    }
    return null;
  }

  function getActiveQueue() {
    return getWalkins()
      .filter(w => w.status === 'waiting')
      .sort((a, b) => a.position - b.position);
  }

  function recalcQueuePositions() {
    const walkins = getWalkins();
    let pos = 1;
    walkins.forEach(w => {
      if (w.status === 'waiting') {
        w.position = pos++;
      }
    });
    set('nn_walkins', walkins);
  }

  function getTodayWalkins() {
    const today = new Date().toISOString().split('T')[0];
    return getWalkins().filter(w => w.checkInTime.startsWith(today));
  }

  /* ---------- Customers ---------- */
  function getCustomers() {
    return get('nn_customers') || [];
  }

  function upsertCustomer(phone, name, email) {
    const customers = getCustomers();
    const normalized = phone.replace(/\D/g, '');
    let customer = customers.find(c => c.phone.replace(/\D/g, '') === normalized);
    if (customer) {
      customer.visits = (customer.visits || 0) + 1;
      customer.lastVisit = new Date().toISOString();
      if (email && !customer.email) customer.email = email;
    } else {
      customer = { id: genId('CUS'), name, phone, email: email || '', visits: 1, createdAt: new Date().toISOString(), lastVisit: new Date().toISOString() };
      customers.push(customer);
    }
    set('nn_customers', customers);
    return customer;
  }

  function findCustomerByPhone(phone) {
    const normalized = phone.replace(/\D/g, '');
    return getCustomers().find(c => c.phone.replace(/\D/g, '') === normalized) || null;
  }

  /* ---------- Today's Stats ---------- */
  function getTodayStats() {
    const today = new Date().toISOString().split('T')[0];
    const todayApts = getAppointmentsByDate(today);
    const todayWalkins = getTodayWalkins();
    const completed = [
      ...todayApts.filter(a => a.status === 'completed'),
      ...todayWalkins.filter(w => w.status === 'completed')
    ];
    const revenue = completed.reduce((sum, item) => sum + (item.price || 0), 0);
    return {
      totalAppointments: todayApts.length,
      completedAppointments: todayApts.filter(a => a.status === 'completed').length,
      totalWalkins: todayWalkins.length,
      activeQueue: getActiveQueue().length,
      inProgress: todayWalkins.filter(w => w.status === 'in-progress').length +
                  todayApts.filter(a => a.status === 'in-progress').length,
      revenue
    };
  }

  /* ---------- Seed Demo Data ---------- */
  function seedIfEmpty() {
    // Seed staff
    if (getStaff().length === 0) {
      const demoStaff = [
        { id: 'STF-001', name: 'Nikki Tran', role: 'Owner & Lead Artist', specialty: 'Nail Art, Acrylic, Gel-X', status: 'available', emoji: '👑', color: '#e91e8c' },
        { id: 'STF-002', name: 'Sophie Chen', role: 'Senior Nail Technician', specialty: 'Gel, Dip Powder, Pedicure', status: 'available', emoji: '💅', color: '#8e24aa' },
        { id: 'STF-003', name: 'Lily Park', role: 'Nail Technician', specialty: 'Classic Mani/Pedi, Gel', status: 'available', emoji: '🌸', color: '#d81b60' },
        { id: 'STF-004', name: 'Maya Patel', role: 'Nail Technician', specialty: 'Nail Art, Ombre, Chrome', status: 'available', emoji: '✨', color: '#f06292' },
        { id: 'STF-005', name: 'Zoe Williams', role: 'Spa Specialist', specialty: 'Pedicure, Waxing, Massage', status: 'available', emoji: '🧖', color: '#c2a86e' }
      ];
      saveStaff(demoStaff);
    }

    // Seed appointments for today
    if (getAppointments().length === 0) {
      const today = new Date().toISOString().split('T')[0];
      const demoApts = [
        { id: 'APT-DEMO001', customerName: 'Emily Rose', phone: '(555) 201-3344', email: 'emily@example.com', service: 'Gel Manicure', serviceId: 'SVC-MANI-02', category: 'Manicure', duration: 45, price: 35, technicianId: 'STF-002', technicianName: 'Sophie Chen', date: today, time: '10:00', status: 'confirmed', notes: 'Prefers light pink shades', createdAt: new Date().toISOString() },
        { id: 'APT-DEMO002', customerName: 'Jessica Wu', phone: '(555) 302-5566', email: 'jess@example.com', service: 'Spa Pedicure', serviceId: 'SVC-PEDI-02', category: 'Pedicure', duration: 55, price: 42, technicianId: 'STF-005', technicianName: 'Zoe Williams', date: today, time: '11:00', status: 'in-progress', notes: '', createdAt: new Date().toISOString() },
        { id: 'APT-DEMO003', customerName: 'Mia Johnson', phone: '(555) 403-7788', email: 'mia@example.com', service: 'Acrylic Full Set', serviceId: 'SVC-MANI-04', category: 'Manicure', duration: 75, price: 55, technicianId: 'STF-001', technicianName: 'Nikki Tran', date: today, time: '13:00', status: 'confirmed', notes: 'Coffin shape, almond length', createdAt: new Date().toISOString() },
        { id: 'APT-DEMO004', customerName: 'Sofia Garcia', phone: '(555) 504-9900', email: 'sofia@example.com', service: 'Mani + Pedi Combo', serviceId: 'SVC-CMB-01', category: 'Combo Packages', duration: 75, price: 48, technicianId: 'STF-003', technicianName: 'Lily Park', date: today, time: '14:30', status: 'pending', notes: '', createdAt: new Date().toISOString() },
        { id: 'APT-DEMO005', customerName: 'Hannah Lee', phone: '(555) 605-1122', email: 'hannah@example.com', service: 'Gel Manicure', serviceId: 'SVC-MANI-02', category: 'Manicure', duration: 45, price: 35, technicianId: 'STF-004', technicianName: 'Maya Patel', date: today, time: '15:00', status: 'completed', notes: 'Chrome add-on requested', createdAt: new Date().toISOString() }
      ];
      set('nn_appointments', demoApts);
    }

    // Seed walk-in queue
    if (getWalkins().length === 0) {
      const demoWalkins = [
        { id: 'WLK-DEMO001', customerName: 'Ava Brown', phone: '(555) 701-2233', service: 'Classic Manicure', serviceId: 'SVC-MANI-01', category: 'Manicure', price: 22, duration: 30, technicianId: 'any', technicianName: 'Any Available', status: 'waiting', position: 1, estimatedWait: 10, checkInTime: new Date(Date.now() - 8 * 60000).toISOString() },
        { id: 'WLK-DEMO002', customerName: 'Olivia Kim', phone: '(555) 802-3344', service: 'Classic Pedicure', serviceId: 'SVC-PEDI-01', category: 'Pedicure', price: 28, duration: 40, technicianId: 'STF-003', technicianName: 'Lily Park', status: 'waiting', position: 2, estimatedWait: 25, checkInTime: new Date(Date.now() - 3 * 60000).toISOString() }
      ];
      set('nn_walkins', demoWalkins);
    }
  }

  return {
    // Services
    getServices, getServiceById, getServiceCategories,
    // Staff
    getStaff, saveStaff, updateStaffStatus,
    // Appointments
    getAppointments, addAppointment, updateAppointment,
    getAppointmentsByDate, findAppointment, getAppointmentsByPhone,
    // Walk-ins
    getWalkins, addWalkin, updateWalkin,
    getActiveQueue, recalcQueuePositions, getTodayWalkins,
    // Customers
    getCustomers, upsertCustomer, findCustomerByPhone,
    // Stats
    getTodayStats,
    // Init
    seedIfEmpty
  };
})();
