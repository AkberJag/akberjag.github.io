import teleBillBotRoutes from './TeleBillBot/router'
import weeGAMERoutes from './weeGAMES/router'

export default [
  {
    path: 'products',
    children: [...teleBillBotRoutes, ...weeGAMERoutes],
  },
]
