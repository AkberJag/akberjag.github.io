import teleBillBotRoutes from './TeleBillBot/router'

export default [
  {
    path: 'products',
    children: [...teleBillBotRoutes],
  },
]
