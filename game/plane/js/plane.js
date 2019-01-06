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

    var backgroundAudio = new PlayAudioUntilFinished("./audio/background.mp3");
    backgroundAudio.play();
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
 * 精灵不在画布范围内时从画布中移除
 */
class OutCanvasActon extends Action {
  execute(sprite, context) {
    var stage = context.stage;
    if (stage.isOutRange(sprite.location, sprite.size)) {
      var plane = stage.currentScene;
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

var images = [
  "background.png", "game_pause_nor.png", "m1.png", "start.png",
  // 敌机1
  "enemy1.png", "enemy1_down1.png", "enemy1_down2.png", "enemy1_down3.png", "enemy1_down4.png",
  // 敌机2
  "enemy2.png", "enemy2_down1.png", "enemy2_down2.png", "enemy2_down3.png", "enemy2_down4.png",
  // 敌机3
  "enemy3_n1.png",
  "enemy3_n2.png",
  "enemy3_hit.png",
  "enemy3_down1.png",
  "enemy3_down2.png",
  "enemy3_down3.png",
  "enemy3_down4.png",
  "enemy3_down5.png",
  "enemy3_down6.png",
  // 游戏loading图
  "game_loading1.png",
  "game_loading2.png",
  "game_loading3.png",
  "game_loading4.png",
  // 玩家飞机图
  "hero1.png",
  "hero2.png",
  "hero_blowup_n1.png",
  "hero_blowup_n2.png",
  "hero_blowup_n3.png",
  "hero_blowup_n4.png"
];

var audios = ["background.mp3"];
