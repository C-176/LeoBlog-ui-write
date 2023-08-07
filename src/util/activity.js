// 定义博客系统中的事件枚举类
// 文章发布
// ARTICLE_PUBLISH(1, "文章发布"),
//     // 创建草稿
//     ARTICLE_DRAFT(2, "创建草稿"),
//     // 点赞文章
//     ARTICLE_LIKE(3, "点赞文章"),
//     // 收藏文章
//     ARTICLE_COLLECT(4, "收藏文章"),
//     // 评论文章
//     ARTICLE_COMMENT(5, "评论文章"),
//     // 回复评论
//     ARTICLE_COMMENT_REPLY(6, "回复评论"),
//     // 关注用户
//     USER_FOLLOW(7, "关注用户"),
//     // 评论活动
//     ACTIVITY_COMMENT(8, "评论活动"),
//     // 购买商品
//     GOODS_BUY(9, "购买商品");
export const Activity = {
    ARTICLE_PUBLISH: 1,
    ARTICLE_DRAFT: 2,
    ARTICLE_LIKE: 3,
    ARTICLE_COLLECT: 4,
    ARTICLE_COMMENT: 5,
    ARTICLE_COMMENT_REPLY: 6,
    USER_FOLLOW: 7,
    ACTIVITY_COMMENT: 8,
    GOODS_BUY: 9

}

export const cursorPageReq = {
    cursor: null,
    pageSize: 10,
    offset: 0,
    userId: null


}

export const cursorPageResp = {
    cursor: null,
    offset: 0,
    isLast: false,
    list: []
}
export default {Activity, cursorPageReq, cursorPageResp}