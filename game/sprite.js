class Point {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  clone() {
    var clone = new Point();
    clone.x = this.x;
    clone.y = this.y;

    return clone;
  }

  copy(point) {
    this.x = point.x;
    this.y = point.y;
  }
}

class Size {
  constructor() {
    this.width = 0;
    this.height = 0;
  }

  clone() {
    var clone = new Size();
    clone.width = this.width;
    clone.height = this.height;

    return clone;
  }

  copy(size) {
    this.width = size.width;
    this.height = size.height;
  }
}

class Box {
  constructor() {
    this.size = null;
    this.location = null;
  }
}

class KeyCode {
  constructor(keyCode, lower, upper) {
    this.keyCode = keyCode;
    this.lower = lower;

    if (upper == undefined || upper == null) {
      this.upper = lower;
    } else {
      this.upper = upper;
    }
  }
}

var keyCodes = [];
// keyCodes.push(new KeyCode(48, "0"));
// keyCodes.push(new KeyCode(49, "1"));
// keyCodes.push(new KeyCode(50, "2"));
// keyCodes.push(new KeyCode(51, "3"));
// keyCodes.push(new KeyCode(52, "4"));
// keyCodes.push(new KeyCode(53, "5"));
// keyCodes.push(new KeyCode(54, "6"));
// keyCodes.push(new KeyCode(55, "7"));
// keyCodes.push(new KeyCode(56, "8"));
// keyCodes.push(new KeyCode(57, "9"));
keyCodes.push(new KeyCode(65, "a", "A"));
keyCodes.push(new KeyCode(66, "b", "B"));
keyCodes.push(new KeyCode(67, "c", "C"));
keyCodes.push(new KeyCode(68, "d", "D"));
keyCodes.push(new KeyCode(69, "e", "E"));
keyCodes.push(new KeyCode(70, "f", "F"));
keyCodes.push(new KeyCode(71, "g", "G"));
keyCodes.push(new KeyCode(72, "h", "H"));
keyCodes.push(new KeyCode(73, "i", "I"));
keyCodes.push(new KeyCode(74, "j", "J"));
keyCodes.push(new KeyCode(75, "k", "K"));
keyCodes.push(new KeyCode(76, "l", "L"));
keyCodes.push(new KeyCode(77, "m", "M"));
keyCodes.push(new KeyCode(78, "n", "N"));
keyCodes.push(new KeyCode(79, "o", "O"));
keyCodes.push(new KeyCode(80, "p", "P"));
keyCodes.push(new KeyCode(81, "q", "Q"));
keyCodes.push(new KeyCode(82, "r", "R"));
keyCodes.push(new KeyCode(83, "s", "S"));
keyCodes.push(new KeyCode(84, "t", "T"));
keyCodes.push(new KeyCode(85, "u", "U"));
keyCodes.push(new KeyCode(86, "v", "V"));
keyCodes.push(new KeyCode(87, "w", "W"));
keyCodes.push(new KeyCode(88, "x", "X"));
keyCodes.push(new KeyCode(89, "y", "Y"));
keyCodes.push(new KeyCode(90, "z", "Z"));

/**
 * ==========================================================================
 * // Action
 * ==========================================================================
 */

class Action {
  execute(sprite, context) {}
  dispose() {}
}

class MoveAction extends Action {
  constructor(ystep, xstep) {
    super();
    if (xstep == undefined || xstep == null) {
      this.xstep = 0;
    } else {
      this.xstep = xstep;
    }

    if (ystep == undefined || ystep == null) {
      this.ystep = 3;
    } else {
      this.ystep = ystep;
    }
  }

  execute(sprite, context) {
    var preBox = sprite.preBox;
    if (preBox.location == null) {
      preBox.location = sprite.location.clone();
      preBox.size = sprite.size.clone();
    } else {
      preBox.location.copy(sprite.location);
      preBox.size.copy(sprite.size);
    }
    sprite.location.y += this.ystep;
    sprite.location.x += this.xstep;
  }
}

class MoveToMouseAction extends Action {
  execute(sprite, context) {
    if (sprite.preBox.location == null) {
      sprite.preBox.location = sprite.location.clone();
      sprite.preBox.size = sprite.size.clone();
    } else {
      sprite.preBox.location.copy(sprite.location);
      sprite.preBox.size.copy(sprite.size);
    }

    // sprite.location.copy(context.mousePoint);
    sprite.location.x = context.mousePoint.x - sprite.size.width / 2;
    sprite.location.y = context.mousePoint.y - sprite.size.height / 2;
  }
}

class PlayAudioUntilFinished extends Action {
  constructor(src) {
    super();
    this.audio = new Audio(src);
  }

  play() {
    this.audio.loop = true;
    this.audio.play();
  }

  execute(sprite, context) {}
}

class Sound {}

/**
 * ==========================================================================
 * // 精灵
 * ==========================================================================
 */

class Sprite {
  constructor() {
    this.name = null;
    this.location = new Point();
    this.size = new Size();
    this.preBox = new Box();
    this.actions = [];
    this.constumes = [];
    this.currentConstume = null;
    this.preConstume = null;
    this.currentIfsCount = 0;
  }

  execute(context) {
    for (var index in this.actions) {
      this.actions[index].execute(this, context);
    }
  }

  draw(context) {
    if (this.currentConstume != null) {
      this.currentConstume.draw(this, context);
    }
  }

  clear(context) {
    // var ctx = context.ctx;
    // if (this.preBox.location == null) {
    //   return;
    // }
    // ctx.clearRect(
    //   this.preBox.location.x,
    //   this.preBox.location.y,
    //   this.preBox.size.width,
    //   this.preBox.size.height
    // );

    // ctx.strokeRect(
    //   this.preBox.location.x,
    //   this.preBox.location.y,
    //   this.preBox.size.width,
    //   this.preBox.size.height
    // );
  }

  addConstume(constume) {
    if (this.currentConstume == null) {
      this.currentConstume = constume;
    }

    this.constumes.push(constume);
  }

  dispose() {
    // this.location = null;
    // this.size = null;
    // this.preBox = null;
    // this.actions = null;
    // this.constumes = null;
    // this.currentConstume = null;
    // this.preConstume = null;
  }

  addImageConstume(imageName) {
    var constume = new Constume(imageName);
    if (this.constumes.length == 0) {
      this.currentConstume = constume;
      this.size.copy(constume.img);
    }
    this.constumes.push(constume);

    return constume;
  }

  nextConstume() {
    var index = this.constumes.indexOf(this.currentConstume) + 1;
    if (index == this.constumes.length) {
      index = 0;
    }

    this.currentConstume = this.constumes[index];
  }

  /**
   * 精灵销毁
   * 子类可以重写次方法添加精灵销毁前爆炸等效果
   */
  destroy() {
    this.delete();
  }

  /**
   * 真正执行精灵销毁，从舞台删除当前精灵
   */
  delete() {
    stage.delete(this);
  }
}

class ConstumeBase {
  draw(sprite, context) {}
}

class Constume extends ConstumeBase {
  constructor(imageName) {
    super();
    this.img = stage.imageLoader.images.get(imageName);
  }

  draw(sprite, context) {
    var ctx = context.ctx;
    ctx.moveTo(sprite.location.x, sprite.location.y);
    ctx.drawImage(this.img, sprite.location.x, sprite.location.y);
    ctx.fill();
  }

  dispose() {
    this.img = null;
  }
}

/**
 * 更换造型
 *
 */
class SwitchConstume extends Action {
  constructor(seconds) {
    super();

    this.seconds = seconds;
  }

  execute(sprite, context) {
    var perConstumeCount = (this.seconds * 1000) / stage.ifs;

    sprite.currentIfsCount++;
    if (sprite.currentIfsCount >= perConstumeCount) {
      sprite.currentIfsCount = 0;
      sprite.nextConstume();
    }
  }
}

/**
 * 更换造型
 *
 */
class SwitchConstumeOnce extends Action {
  constructor(seconds) {
    super();
    this.seconds = seconds;
  }

  execute(sprite, context) {
    var perConstumeCount = (this.seconds * 1000) / stage.ifs;
    sprite.currentIfsCount++;
    if (sprite.currentIfsCount >= perConstumeCount) {
      var constumes = sprite.constumes;
      let islasted =
        constumes.indexOf(sprite.currentConstume) == constumes.length - 1;
      if (islasted) {
        sprite.delete();
      } else {
        sprite.currentIfsCount = 0;
        sprite.nextConstume();
      }
    }
  }
}

class Ball extends Sprite {
  constructor() {
    super();

    this.location.x = 50;
    this.location.y = stage.size.height;

    this.radius = 5;
  }

  draw(context) {
    var ctx = context.ctx;
    ctx.moveTo(this.location.x + this.radius, this.location.y);
    ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  clear(context) {
    var ctx = context.ctx;
    if (this.preBox.location == null) {
      return;
    }
    var offset = this.radius + ctx.lineWidth;
    ctx.clearRect(
      this.preBox.location.x - offset,
      this.preBox.location.y - offset,
      offset * 2,
      offset * 2
    );
  }
}

class CodingSpriteContext {
  constructor(ctx, stage) {
    this.mousePoint = new Point();
    this.ctx = ctx;
    this.keydownEvent = null;
    this.keyupEvent = null;
    this.stage = stage;
  }
}

/**
 * ==========================================================================
 * // 舞台
 * ==========================================================================
 */
class Stage {
  constructor() {
    this.fontSize = 50;
    this.scenes = [];
    this.currentScene = null;

    this.ifs = 50; //InterFrame Space， IFS 帧的时间间隔
    this.isStarted = false;

    this.initializeContext.bind(this);
    this.initializeContext();

    this.initializeEvent.bind(this);
    this.initializeEvent();

    this.imageLoader = null;
    this.audioLoader = null;
    this.loadingCount = 0;
  }

  addImages(path, images) {
    this.imageLoader = new ImageLoader(path, images);
  }

  addAudios(path, audios) {
    this.audioLoader = new AudioLoader(path, audios);
  }

  addScene(scene) {
    if (this.currentScene == null) {
      this.currentScene = scene;
    }
    this.scenes.push(scene);
  }

  nextScene() {
    var index = this.scenes.indexOf(this.currentScene) + 1;
    if (index == this.scenes.length) {
      index = 0;
    }

    this.currentScene.destroy(this.context);
    
    this.currentScene = this.scenes[index];
    this.currentScene.start();
  }

  initializeContext() {
    this.canvas = document.getElementById("canvas");
    var ctx = this.canvas.getContext("2d");
    ctx.fillStyle = "red";
    ctx.lineWidth = 1;
    ctx.font = this.fontSize + "px Arial";

    this.context = new CodingSpriteContext(ctx, this);

    this.size = new Size();
    this.size.width = this.canvas.width;
    this.size.height = this.canvas.height;
  }

  initializeEvent() {
    this.canvas.onmousemove = function(e) {
      var box = canvas.getBoundingClientRect();
      stage.context.mousePoint.x = e.pageX - box.x;
      stage.context.mousePoint.y = e.pageY - box.y;
    };

    this.canvas.onmousedown = function(e) {
      stage.context.mousedownEvent = e;
    };

    window.onkeydown = function(e) {
      stage.context.keydownEvent = e;
    };

    window.onkeyup = function(e) {
      stage.context.keyupEvent = null;
    };
  }

  /**
   * 从舞台中移除精灵
   * @param {*} sprite
   */
  delete(sprite) {
    var sprites = this.currentScene.sprites;

    var index = sprites.indexOf(sprite);
    if (index < 0) {
      return false;
    }

    sprites.splice(index, 1);
    sprite.clear(this.context);

    sprite.dispose();
    sprite = null;
    return true;
  }

  /**
   *  启动游戏
   */
  start() {
    // new PlayAudioUntilFinished("./res/background2.mp3").play();
    this.isStarted = true;
    this.currentScene.start();
    this.interval = setInterval(this.render.bind(this), this.ifs);
    if (this.started != undefined && this.started != null) {
      this.started(this.context);
    }
  }

  /**
   * 停止游戏
   */
  stop() {
    if (stage.interval != null) {
      clearInterval(stage.interval);
      stage.isStarted = false;
    }
  }

  render() {
    var sprites = this.currentScene.sprites;
    for (var i in sprites) {
      sprites[i].clear(this.context);
    }

    this.context.ctx.beginPath();

    for (var i in sprites) {
      sprites[i].draw(this.context);
    }

    this.context.ctx.closePath();

    for (var i in sprites) {
      sprites[i].execute(this.context);
    }
  }

  /**
   * 获取画布一个任意X坐标，以设定精灵初始化X位置的随机位置
   * @param {*} offsetLeft 左侧留白，防止精灵超出画布边缘，影响显示效果
   * @param {*} offsetRight 右侧留白,，防止精灵超出画布边缘，影响显示效果
   */
  getRandomX(offsetLeft, offsetRight) {
    var xarea = this.size.width - offsetLeft - offsetRight;
    var x = offsetLeft + Math.floor(Math.random() * xarea);

    return x;
  }

  /**
   * 造型居中显示时候得到X坐标
   * @param {宽度} width
   */
  getXofMiddle(width) {
    return Math.ceil((this.size.width - width) / 2);
  }

  /**
   * 造型居中显示时候得到Y坐标
   * @param {宽度} width
   */
  getYofMiddle(height) {
    return Math.ceil((this.size.height - height) / 2);
  }

  isOutRange(location, size) {
    var x = location.x;
    var y = location.y;

    // | \
    // |---
    // | /
    if (x > this.size.width) {
      return true;
    }

    //--------
    //   |
    //  \ /
    if (y > this.size.height) {
      return true;
    }

    x = location.x + size.width;
    y = location.y + size.height;

    //  / \
    //   |
    //--------
    if (y < 0) {
      return true;
    }

    // /  |
    // ---|
    // \  |
    if (x < 0) {
      return true;
    }

    return false;
  }
}

class Scene {
  constructor() {
    this.sprites = [];
  }

  clear(context) {
    var ctx = context.ctx;
    var size = context.stage.size;
    ctx.clearRect(0, 0, size.width, size.height);
  }

  start() {}

  destroy(context){

    this.clear(context);
  }
}

class NextSceneKeydownAction extends Action {
  execute(sprite, context) {
    if (context.mousedownEvent != null) {
      var stage = context.stage;
      stage.nextScene();
      context.mousedownEvent = null;
    }
  }
}

class ImageLoader {
  constructor(path, names) {
    this.images = new Map();
    this.path = path;
    this.names = names;
  }



  load() {
    for (var i in this.names) {
      var name = this.names[i];

      var img = new Image();
      img.src = this.path + name;
      img.onload = this.onImageLoad;

      this.images.set(name, img);
    }
  }

  getImage(imageName){
    return this.images.get(imageName);
  }

  onImageLoad() {
    stage.loadingCount++;
  }
}

class AudioLoader {
  constructor(path, names) {
    this.audios = new Map();
    this.path = path;
    this.names = names;
  }

  load() {
    for (var i in this.names) {
      var name = this.names[i];

      var audio = new Audio(this.path + name);
      audio.onload = this.onAudioLoad;

      this.audios.set(name, audio);
    }
  }

  onAudioLoad() {
    stage.loadingCount++;
  }
}

class ResourceLoadingConstume extends ConstumeBase {
  constructor() {
    super();
    this.toalCount = 0;
  }

  draw(sprite, context) {
    if (stage.imageLoader.images.size == 0) {
      stage.imageLoader.load();
      stage.audioLoader.load();
      this.toalCount =
        stage.imageLoader.images.size + stage.audioLoader.audios.size;

      sprite.preBox = new Box();
      sprite.preBox.location = sprite.location.clone();
      sprite.preBox.size = sprite.size.clone();

      sprite.preBox.location.y -= 50;
      sprite.preBox.size.width += 50;
    }

    var loadingCount = stage.loadingCount;

    var percent = Math.ceil((loadingCount * 100) / this.toalCount);

    var ctx = context.ctx;

    ctx.fillText(
      "loading " + percent + "% ...",
      sprite.location.x,
      sprite.location.y
    );

    sprite.clear(context);
    stage.nextScene();
  }
}

class WelcomeScene extends Scene {
  constructor(imageName) {
    super();

    this.imageName = imageName;
  }

  start() {
    var sprite = new Sprite();
    var welcomeConstume = sprite.addImageConstume(this.imageName);
    // var width = welcomeConstume.img.width;
    var width = 400;
    sprite.location.x = stage.getXofMiddle(width);
    sprite.actions.push(new NextSceneKeydownAction());
    this.sprites.push(sprite);
  }
}

class TextConstume extends ConstumeBase {

  constructor(text) {
    super();
    this.text = text;
  }

  draw(sprite, context) {
    var ctx = context.ctx;
    ctx.fillText(this.text, sprite.location.x, sprite.location.y);
  }
}

class GameOverScene extends Scene {
  constructor(imageName) {
    super();

    this.imageName = imageName;
  }

  start() {
    var sprite = new Sprite();
    var constume = new TextConstume("GAME OVER!");

    sprite.size.width= Math.ceil(stage.context.ctx.measureText(constume.text).width);
    sprite.size.height = stage.fontSize * 2;
    sprite.location.x = stage.getXofMiddle(sprite.size.width);
    sprite.location.y = stage.getYofMiddle(sprite.size.height);
    sprite.currentConstume = constume;
    sprite.constumes.push(constume);
    sprite.actions.push(new NextSceneKeydownAction());

    this.sprites.push(sprite);
  }
}

/**
 * 背景图片精灵
 */
class BackgroundSprite extends Sprite{

  constructor(imageName){

    super();
    this.imageName = imageName;
    this.img = stage.imageLoader.getImage(this.imageName);
    this.moveStep = 1;
    this.location.x = 0;
    this.location.y = 0;
    this.size.width = this.img.width;
  }

  execute(context) {
    this.location.y += this.moveStep;

    if(this.location.y > context.stage.size.height){
      this.location.y -= context.stage.size.height;
    }
  }

  draw(context) {
    var ctx = context.ctx;
    ctx.drawImage(this.img,this.location.x,this.location.y);
    ctx.drawImage(this.img,this.location.x,this.location.y-this.img.height);
  }

  clear(context) {
    var ctx = context.ctx;
    var size = context.stage.size;
    ctx.clearRect(0,0,size.width,size.height)
  }
}