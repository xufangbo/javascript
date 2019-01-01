/**
 * 飞机大战场景
 */
class PlaneScene extends Scene {
  /**
   * 构造函数
   * 初始化所有活动的敌人和子弹精灵
   */
  constructor() {
    super();

    this.enemies = [];
    this.bullets = [];
  }

  /**
   * 启动场景
   */
  start(context) {
    Actions.loadActions();

    var background = new BackgroundSprite("background.png");
    this.sprites.push(background);

    var hero = new Hero();
    this.sprites.push(hero);
  }

  /**
   * 销毁场景
   * @param {游戏上下文} context
   */
  destroy(context) {
    for (var i in this.sprites) {
      // this.delete(this.sprites[i]);
      var sprite = this.sprites[i];
      sprite.dispose();
      sprite.delete();
    }

    this.enemies = [];
    this.bullets = [];
    this.sprite = [];

    super.destroy(context);
  }

  /**
   * 删除精灵
   * @param {*} sprite
   */
  delete(sprite) {
    var bullets = this.bullets;
    if (sprite.name == "bullet") {
      bullets.splice(bullets.indexOf(sprite), 1);
    }

    var enemies = this.enemies;
    if (sprite.name == "enemy") {
      enemies.splice(enemies.indexOf(sprite), 1);
    }

    sprite.destroy();
  }
}

/**
 * 敌人精灵基础类
 */
class Enemy extends Sprite {
  constructor() {
    super();

    this.name = "enemy"; //名称
    this.lifeValue = 0; //生命值
    this.attackAbility = 0; //攻击能力
  }

  /**
   * 基于图片添加造型
   * 三个敌人都是基于图片的造型
   * x轴取画布宽度范围内的任意值
   * y轴取造型高度的负值，目的是让敌人慢慢出来，而不突然蹦出来
   * @param {造型对应的图片名称} imageName
   */
  addConstume(imageName) {
    this.addImageConstume(imageName);
    this.location.y = 0 - this.size.height;
    this.location.x = stage.getRandomX(0, this.size.width);
  }

  /**
   * 销毁敌人
   */
  destroy() {
    this.actions = [];
    this.constumes = [];
    this.currentConstume = null;
  }
}

/**
 * 一号敌人（最小的飞机）
 * 最小的飞机
 */
class Enemy1 extends Enemy {
  constructor() {
    super();

    this.lifeValue = 2; //生命值
    this.attackAbility = 2; //攻击能力
    this.addConstume("enemy1.png"); //造型图片

    this.actions.push(Actions.move1Action); //移动
    this.actions.push(Actions.outRangeAction); //超出画布边界
  }

  /**
   * 爆炸效果
   */
  destroy() {
    super.destroy();
    this.actions.push(Actions.switchConstumeOnce);

    this.addImageConstume("enemy1_down1.png");
    this.addImageConstume("enemy1_down2.png");
    this.addImageConstume("enemy1_down3.png");
    this.addImageConstume("enemy1_down4.png");
  }
}

/**
 * 二号敌人（中等大的飞机）
 */
class Enemy2 extends Enemy {
  constructor() {
    super();

    this.lifeValue = 5; //生命值
    this.attackAbility = 5; //攻击能力
    this.addConstume("enemy2.png"); //造型图片
    this.actions.push(Actions.move2Action); //移动
    this.actions.push(Actions.outRangeAction); //超出画布边界
  }

  /**
   * 爆炸效果
   */
  destroy() {
    super.destroy();
    this.actions.push(Actions.switchConstumeOnce);

    this.addImageConstume("enemy2_down1.png");
    this.addImageConstume("enemy2_down2.png");
    this.addImageConstume("enemy2_down3.png");
    this.addImageConstume("enemy2_down4.png");
  }
}

/**
 * 三号敌人(航母)
 */
class Enemy3 extends Enemy {
  constructor() {
    super();
    this.lifeValue = 100; //生命值
    this.attackAbility = 100; //攻击能力值
    this.addConstume("enemy3_n1.png"); //造型1
    this.addConstume("enemy3_n2.png"); //造型2
    this.actions.push(Actions.outRangeAction); //超出画布显示区域销毁
    this.actions.push(Actions.move3Action); //移动效果
    // this.actions.push(Actions.switchConstumeAction); //造型动画效果
  }

  /**
   * 爆炸效果
   */
  destroy() {
    super.destroy();
    this.actions.push(Actions.switchConstumeOnce);
    this.addImageConstume("enemy3_down1.png");
    this.addImageConstume("enemy3_down2.png");
    this.addImageConstume("enemy3_down3.png");
    this.addImageConstume("enemy3_down4.png");
    this.addImageConstume("enemy3_down5.png");
    this.addImageConstume("enemy3_down6.png");
  }
}

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
 * 创建敌机Action
 */
class CreateEnemyAction extends Action {
  constructor() {
    super();
    this.count = 0;
    this.sprites = stage.currentScene.sprites;
    this.switchConstumeAction = Actions.switchConstume;
  }

  /**
   * 每10帧创建一个一号敌机
   * 每40帧创建一个二号敌机
   * 每200帧创建一个航母敌机
   * @param {*} sprite 
   * @param {*} context 
   */
  execute(sprite, context) {
    this.count++;
    if (this.count % 10 == 0) {
      this.createEnemy1();
    }
    if (this.count % 40 == 0) {
      this.createEnemy2();
    }
    if (this.count % 200 == 0) {
      this.createEnemy3();
    }
  }

  /**
   * 创建一号敌机
   */
  createEnemy1() {
    var plane = stage.currentScene;

    var enemy1 = new Enemy1();
    this.sprites.push(enemy1);
    plane.enemies.push(enemy1);
  }

  /**
   * 创建二号敌机
   */
  createEnemy2() {
    var plane = stage.currentScene;
    var enemy2 = new Enemy2();
    this.sprites.push(enemy2);
    plane.enemies.push(enemy2);
  }

  /**
   * 创建三号敌机
   */
  createEnemy3() {
    var plane = stage.currentScene;
    var enemy3 = new Enemy3();
    this.sprites.push(enemy3);
    plane.enemies.push(enemy3);
  }

  dispose() {}
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

/**
 * GameOver动作
 * 即跳转到GameOver场景
 */
class GameOverAction extends Action {
  constructor(seconds) {
    super();
    this.seconds = seconds;
  }

  /**
   * 飞机被击中，播放爆炸效果后，进入GameOver的场景
   * @param {*} sprite 
   * @param {*} context 
   */
  execute(sprite, context) {
    var perConstumeCount = (this.seconds * 1000) / stage.ifs;
    sprite.currentIfsCount++;
    if (sprite.currentIfsCount >= perConstumeCount) {
      var constumes = sprite.constumes;
      let islasted =
        constumes.indexOf(sprite.currentConstume) == constumes.length - 1;
      if (islasted) {
        // stage.stop();
        stage.nextScene();
      } else {
        sprite.currentIfsCount = 0;
        sprite.nextConstume();
      }
    }
  }
}

/**
 * 创建子弹动作
 */
class CreateBulletAction extends Action {
  constructor(seconds) {
    super();

    this.seconds = 0.1;
    this.ifsCount = (this.seconds * 1000) / stage.ifs;
    this.currentCount = 0;

    this.outRangeAction = new OutCanvasActon();
    this.leftAction = new MoveAction(-20, -1);
    this.middleAction = new MoveAction(-20, 0);
    this.rightAction = new MoveAction(-20, 1);
    this.hitAction = new HitAction();
  }

  /**
   * 执行子弹创建工作
   * @param {*} sprite 
   * @param {*} context 
   */
  execute(sprite, context) {
    this.currentCount++;
    if (this.currentCount == this.ifsCount) {
      this.createBulletMiddle(sprite);
      this.createBulletLeft(sprite);
      this.createBulletRight(sprite);

      this.currentCount = 0;
    }
  }

  /**
   * 中间一排子弹
   * @param {*} sprite 
   */
  createBulletMiddle(sprite) {
    var bullet = new Sprite();
    bullet.location.x = sprite.location.x + 48;
    bullet.location.y = sprite.location.y - 25;
    bullet.actions.push(this.middleAction);

    this.setBullet(bullet, 0);
  }

  /**
   * 右边子弹
   * @param {*} sprite 
   */
  createBulletRight(sprite) {
    var bullet = new Sprite();
    bullet.location.x = sprite.location.x + 80;
    bullet.location.y = sprite.location.y + 20;
    bullet.actions.push(this.rightAction);

    this.setBullet(bullet, 1);
  }

  /**
   * 左边子弹
   * @param {*} sprite 
   */
  createBulletLeft(sprite) {
    var bullet = new Sprite();
    bullet.location.x = sprite.location.x + 15;
    bullet.location.y = sprite.location.y + 20;
    bullet.actions.push(this.leftAction);

    this.setBullet(bullet, -1);
  }

  /**
   * 子弹通用设置
   * @param {*} bullet 
   * @param {*} x 
   */
  setBullet(bullet, x) {

    var plane = stage.currentScene;

    bullet.name = "bullet";
    bullet.addImageConstume("m1.png");

    bullet.actions.push(this.hitAction);
    bullet.actions.push(this.outRangeAction);

    plane.bullets.push(bullet);
    stage.currentScene.sprites.push(bullet);
  }
}

/**
 * 精灵不在画布范围内时从画布中移除
 */
class OutCanvasActon extends Action {
  execute(sprite, context) {
    var stage = context.stage;
    if (stage.isOutRange(sprite.location, sprite.size)) {
      var plane = stage.currentScene;
      // if(plane.delete == undefined){
      //   debugger;
      // }
      plane.delete(sprite);
    }
  }
}

/**
 * 飞机大战常用的Action
 */
class PlaneActions {
  loadActions() {
    this.switchConstume = new SwitchConstume(0.2);
    this.switchConstumeOnce = new SwitchConstumeOnce(0.2);
    this.outRangeAction = new OutCanvasActon();
    this.move1Action = new MoveAction(3);
    this.move2Action = new MoveAction(2);
    this.move3Action = new MoveAction(1);
  }
}

var Actions = new PlaneActions();
