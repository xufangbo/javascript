
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
 * 创建敌机Action
 */
class CreateEnemyAction extends Action { 
    constructor() {
      super();
      this.count = 0;
      this.sprites = stage.currentScene.sprites;
      this.switchConstumeAction = Actions.switchConstume;
      this.enemyIfs = 1 ;
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
      if (this.count % (this.enemyIfs * 10) == 0) {
        // 创建1号敌机
        this.createEnemy1();
      }
      if (this.count % (this.enemyIfs * 30) == 0) {
        // 创建2号敌机
        // this.createEnemy2();
      }
      if (this.count % (this.enemyIfs * 200)  == 0) {
        // 创建3号敌机
        // this.createEnemy3();
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