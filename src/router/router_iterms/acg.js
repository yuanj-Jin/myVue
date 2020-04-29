//个人信息

export default [{
        // 个人管理
        path: '/album',
        component: resolve => require(['@/components/album/RotateAlbum'], resolve)
    },
    {
        // 活动审核
        path: '/anime',
        component: resolve => require(['@/components/anime/Anime'], resolve)
    },


]