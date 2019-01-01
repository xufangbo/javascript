/**
 * ==========================================================================
 * // 打字游戏
 * ==========================================================================
 */

class Word extends Sprite {
  constructor(keyCode, letter) {
    super();

    this.keyCode = keyCode;
    this.letter = letter;
    this.fontSize = stage.fontSize;

    this.size.width = this.fontSize;
    this.size.height = this.fontSize;

    this.location.x = stage.getRandomX(0,this.size.width);
    this.location.y = 0 - this.size.height;
  }

  draw(context) {
    var ctx = context.ctx;
    ctx.fillText(this.letter, this.location.x, this.location.y);
  }

  clear(context) {
    var ctx = context.ctx;
    if (this.preBox.location == null) {
      return;
    }
    ctx.clearRect(
      this.preBox.location.x,
      this.preBox.location.y - this.preBox.size.height,
      this.preBox.size.width,
      this.preBox.size.height * 1.5
    );

    // ctx.strokeRect(
    //   this.preBox.location.x,
    //   this.preBox.location.y - this.fontSize,
    //   this.preBox.size.width,
    //   this.preBox.size.height
    // );
  }
}

class Typing {
  constructor() {
    this.start.bind(this);
    this.addWord.bind(this);
    this.spliteTime = 1000;
  }

  start() {
    var me = this;
    setInterval(function() {
      me.addWord();
    }, this.spliteTime);

    // this.addWord();
  }

  addWord() {
    var index = Math.floor(Math.random() * keyCodes.length);
    if (index < 0 || index >= keyCodes.length) {
      return;
    }
    var keyCode = keyCodes[index];
    var sprite = new Word(keyCode.keyCode, keyCode.upper);
    sprite.actions.push(new MoveAction(3));
    sprite.actions.push(new WordOutofRange());

    scene.sprites.push(sprite);
  }
}

class TypingKeyDownAction extends Action {
  constructor() {
    super();
    this.audioOk = new Audio("./res/hit.mp3");
    this.audioNo = new Audio("./res/no.mp3");
  }

  execute(sprite, context) {
    if (context.keydownEvent == null) {
      return;
    }

    var code = context.keydownEvent.keyCode;
    context.keydownEvent = null;
    var word = this.getByCode(code);

    if (word != null) {
      word.destroy();
      this.audioOk.currentTime = 0;
      this.audioOk.play();
    } else {
      this.audioNo.currentTime = 0;
      this.audioNo.play();
    }
  }

  getByCode(code) {
    for (var i in stage.currentScene.sprites) {
      var sprite = stage.currentScene.sprites[i];
      if (sprite.keyCode == undefined || sprite.keyCode == null) {
        continue;
      }

      if (sprite.keyCode == code) {
        return sprite;
      }
    }

    return null;
  }
}

class WordOutofRange extends Action {
  constructor() {
    super();
    this.audio = new Audio("./res/falldown.mp3");
  }
  execute(sprite, context) {
    if (sprite.location.y > stage.size.height) {
      stage.delete(sprite);

      this.audio.currentTime = 0;
      this.audio.play();
    }
  }
}
