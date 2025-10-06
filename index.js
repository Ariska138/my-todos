import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { db } from './db/index.js';
import { users } from './db/schema.js';
import bcrypt from 'bcryptjs';

const app = new Hono();

app.get('/', (c) => c.html('<h1>Tim Pengembang</h1><h2>Nama Kalian</h2>'));

app.post('/register', async (c) => {
  try {
    const { username, password } = await c.req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db
      .insert(users)
      .values({ username, password: hashedPassword })
      .returning({ id: users.id, username: users.username });

    return c.json({ success: true, data: newUser[0] }, 201);
  } catch (error) {
    return c.json({ success: false, message: 'Registrasi gagal' }, 400);
  }
});

serve({ fetch: app.fetch, port: 3000 });
console.log('✅ API running at http://localhost:3000');
