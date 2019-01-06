
/**
 * 英雄
 * 我方的战斗机
 */
class Hero extends Sprite {
    constructor() {
      super();
  
      this.name = "hero"; //名称
      this.lifeValue = 100;//生命值
      this.attackAbility = 20;//攻击能力
      this.location.x = stage.size.width / 2; //初始坐标X轴
      this.location.y = stage.size.height - 150;//初始坐标Y轴
  
      this.addImageConstume("hero1.png"); //造型1
      this.addImageConstume("hero2.png"); //造型2
  
      this.actions.push(new MoveToMouseAction()); //跟随鼠标移动
      this.actions.push(new CreateBulletAction());//发射子弹
      this.actions.push(new CreateEnemyAction()); //创建敌机
      this.actions.push(Actions.switchConstume); //造型动画
      this.actions.push(new HeroHitAction()); //被击中Action
    }
  
    /**
     * 我方战机被销毁
     */
    destroy() {
      this.actions = [];
      this.constumes = [];
      this.currentConstume = null; 
  
      this.actions.push(new GameOverAction(0.2));
      this.addImageConstume("hero_blowup_n1.png");
      this.addImageConstume("hero_blowup_n2.png");
      this.addImageConstume("hero_blowup_n3.png");
      this.addImageConstume("hero_blowup_n4.png");
    }
  }
  
  
/**
 * 子弹击中敌人动作
 */
class HitAction extends Action {

    /**
     * 击中敌机以后子弹从舞台中销毁
     * 敌人如果生命值<=0,那么敌机从舞台中销毁
     * @param {Sprite} sprite 既子弹
     * @param {*} context 
     */
    execute(sprite, context) {
      var plane = context.stage.currentScene;
      for (var i in plane.enemies) {
        var enemy = plane.enemies[i];
        if (this.hit(sprite, enemy)) {
          plane.delete(sprite);
  
          enemy.lifeValue--;
          if (enemy.lifeValue <= 0) {
            plane.delete(enemy);
          }
        }
      }
    }
  
    /**
     *  两个精灵碰撞检测，即子弹射中了敌人没有
     * @param {*} sprite1 精灵1，即子弹
     * @param {*} sprite2 精灵2 ，既敌机
     */
    hit(sprite1, sprite2) {
      var location = sprite1.location;
  
      if (this.contains(sprite2, location.x, location.y)) {
        return true;
      }
  
      var size = sprite1.size;
      if (this.contains(sprite2, location.x + size.width, location.y)) {
        return true;
      }
  
      if (
        this.contains(sprite2, location.x + size.width, location.y + size.height)
      ) {
        return true;
      }
  
      if (
        this.contains(sprite2, location.x + size.width, location.y + size.height)
      ) {
        return true;
      }
  
      return false;
    }
  
    contains(sprite, x, y) {
      var location = sprite.location;
      var size = sprite.size;
  
      if (
        x > location.x &&
        x < location.x + size.width &&
        y > location.y &&
        y < location.y + size.height
      ) {
        return true;
      }
  
      return false;
    }
  }
  
  /**
   * 我方英雄战机被击中时动作
   */
  class HeroHitAction extends HitAction {
    execute(sprite, context) {
      var plane = context.stage.currentScene;
      for (var i in plane.enemies) {
        var enemy = plane.enemies[i];
        if (this.hit(sprite, enemy)) {
          enemy.lifeValue -= sprite.attackAbility;
          if (enemy.lifeValue <= 0) {
            plane.delete(enemy);
          }
  
          sprite.lifeValue -= enemy.attackAbility;
          if (sprite.lifeValue <= 0) {
            sprite.destroy();
          }
        }
      }
    }
  }