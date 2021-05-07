module.exports = Object.freeze({
  name: 'beep',
  displayName: 'Censor Curse Words',
  plugin: {
    route: 'plugins/beep',
    icon: 'fa-microphone-slash',
  },

  replacementSymbol: '*',
  defaultBanList: [
    'anal', 'anus', 'arse', 'ass', 'ballsack', 'balls', 'bastard', 'bitch', 'biatch', 'bloody',
    'blowjob', 'blow job', 'bollock', 'bollok', 'boner', 'boob', 'bugger', 'bum', 'butt', 'buttplug',
    'clitoris', 'cock', 'coon', 'crap', 'cunt', 'damn', 'dick', 'dildo', 'dyke', 'fag', 'feck',
    'fellate', 'fellatio', 'felching', 'fuck', 'f u c k', 'fudgepacker', 'fudge packer', 'flange',
    'homo', 'jerk', 'jizz', 'knobend', 'knob end', 'labia', 'muff', 'nigger', 'nigga', 'penis',
    'piss', 'poop', 'prick', 'pube', 'pussy', 'queer', 'sex', 'shit', 's hit', 'sh1t', 'slut',
    'smegma', 'spunk', 'tit', 'tosser', 'turd', 'twat', 'vagina', 'wank', 'whore',
  ],
});
