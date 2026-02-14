/* ============================================
   LocalStorage Data Store
   Handles persistence for orders, messages,
   tickets, and chat history.
   ============================================ */

const Store = (() => {
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

  function generateId() {
    return "ORD-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
  }

  function generateTicketId() {
    return "TKT-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
  }

  /* ---------- Orders ---------- */
  function getOrders() {
    return get("ps_orders") || [];
  }

  function addOrder(order) {
    const orders = getOrders();
    order.id = generateId();
    order.status = "pending";
    order.createdAt = new Date().toISOString();
    orders.push(order);
    set("ps_orders", orders);
    return order;
  }

  function updateOrderStatus(orderId, status) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      set("ps_orders", orders);
    }
    return order;
  }

  function findOrder(orderId) {
    return getOrders().find(o => o.id === orderId) || null;
  }

  /* ---------- Contact Messages ---------- */
  function getMessages() {
    return get("ps_messages") || [];
  }

  function addMessage(msg) {
    const messages = getMessages();
    msg.id = generateTicketId();
    msg.createdAt = new Date().toISOString();
    msg.read = false;
    messages.push(msg);
    set("ps_messages", messages);
    return msg;
  }

  function markMessageRead(msgId) {
    const messages = getMessages();
    const msg = messages.find(m => m.id === msgId);
    if (msg) {
      msg.read = true;
      set("ps_messages", messages);
    }
  }

  /* ---------- Support Tickets ---------- */
  function getTickets() {
    return get("ps_tickets") || [];
  }

  function addTicket(ticket) {
    const tickets = getTickets();
    ticket.id = generateTicketId();
    ticket.status = "open";
    ticket.createdAt = new Date().toISOString();
    tickets.push(ticket);
    set("ps_tickets", tickets);
    return ticket;
  }

  function updateTicketStatus(ticketId, status) {
    const tickets = getTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      ticket.status = status;
      ticket.updatedAt = new Date().toISOString();
      set("ps_tickets", tickets);
    }
    return ticket;
  }

  /* ---------- Chat History ---------- */
  function getChatHistory() {
    return get("ps_chat") || [];
  }

  function addChatMessage(role, text) {
    const history = getChatHistory();
    history.push({ role, text, time: new Date().toISOString() });
    set("ps_chat", history);
    return history;
  }

  function clearChat() {
    set("ps_chat", []);
  }

  /* ---------- Seed demo data ---------- */
  function seedIfEmpty() {
    if (getOrders().length === 0) {
      const demoOrders = [
        { customerName: "Alice Johnson", email: "alice@example.com", phone: "555-0101", documentType: "Business Cards", quantity: 500, notes: "Matte finish, double-sided", status: "completed", id: "ORD-DEMO001", createdAt: "2026-02-10T09:00:00Z" },
        { customerName: "Bob Smith", email: "bob@example.com", phone: "555-0102", documentType: "Brochures", quantity: 200, notes: "Tri-fold, glossy paper", status: "in-progress", id: "ORD-DEMO002", createdAt: "2026-02-12T14:30:00Z" },
        { customerName: "Carol Davis", email: "carol@example.com", phone: "555-0103", documentType: "Posters", quantity: 50, notes: "24x36 inches, full color", status: "pending", id: "ORD-DEMO003", createdAt: "2026-02-13T11:15:00Z" },
        { customerName: "Dan Wilson", email: "dan@example.com", phone: "555-0104", documentType: "Flyers", quantity: 1000, notes: "A5 size, single-sided", status: "pending", id: "ORD-DEMO004", createdAt: "2026-02-14T08:00:00Z" }
      ];
      set("ps_orders", demoOrders);
    }

    if (getMessages().length === 0) {
      const demoMessages = [
        { id: "TKT-DEMO001", name: "Eve Martinez", email: "eve@example.com", subject: "Bulk pricing inquiry", message: "Hi, I need a quote for 10,000 flyers. Do you offer bulk discounts?", createdAt: "2026-02-11T10:00:00Z", read: false },
        { id: "TKT-DEMO002", name: "Frank Lee", email: "frank@example.com", subject: "Custom paper stock", message: "Do you carry recycled paper options for business cards?", createdAt: "2026-02-12T16:45:00Z", read: true }
      ];
      set("ps_messages", demoMessages);
    }

    if (getTickets().length === 0) {
      const demoTickets = [
        { id: "TKT-DEMO010", orderId: "ORD-DEMO002", name: "Bob Smith", email: "bob@example.com", issue: "Color on proof looks different from my design file", status: "open", createdAt: "2026-02-13T09:00:00Z" }
      ];
      set("ps_tickets", demoTickets);
    }
  }

  return {
    getOrders, addOrder, updateOrderStatus, findOrder,
    getMessages, addMessage, markMessageRead,
    getTickets, addTicket, updateTicketStatus,
    getChatHistory, addChatMessage, clearChat,
    seedIfEmpty
  };
})();
