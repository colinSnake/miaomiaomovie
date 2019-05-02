export default {
    path: '/movie',
    component: () => import('@/pages/Movie'),
    children: [
        { path: 'city', component: () => import('@/components/City') },
        { path: 'hotplaying', component: () => import('@/components/HotPlaying') },
        { path: 'soontoplay', component: () => import('@/components/SoonToPlay') },
        { path: 'search', component: () => import('@/components/Search') },
        { path: '/movie', redirect: '/movie/hotplaying'}
    ]
}