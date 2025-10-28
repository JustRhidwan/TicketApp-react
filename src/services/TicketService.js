// Ticket storage in localStorage under 'ticketapp_tickets'
const KEY = "ticketapp_tickets";

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

const TicketService = {
  list: async () => {
    return new Promise((res) => setTimeout(() => res(read()), 300));
  },
  create: async (ticket) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (!ticket.title || !ticket.status) return rej(new Error("Validation error"));
        const all = read();
        const newT = { ...ticket, id: Date.now().toString() };
        all.unshift(newT);
        write(all);
        res(newT);
      }, 300);
    });
  },
  update: async (id, changes) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const all = read();
        const idx = all.findIndex(t => t.id === id);
        if (idx === -1) return rej(new Error("Ticket not found"));
        all[idx] = { ...all[idx], ...changes };
        write(all);
        res(all[idx]);
      }, 300);
    });
  },
  delete: async (id) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        let all = read();
        const prevLen = all.length;
        all = all.filter(t => t.id !== id);
        if (all.length === prevLen) return rej(new Error("Ticket not found"));
        write(all);
        res(true);
      }, 300);
    });
  }
};
export default TicketService;