module.exports = grammar({
  name: 'ini',

  extras: $ => [/[^\S\n\r]+/],

  rules: {
    source_file: $ => repeat($._item),

    _item: $ => choice(
      $.section,
      $.pair,
      $.comment,
      $.newline
    ),

    section: $ => seq(
      '[',
      field('name', $.section_name),
      ']'
    ),

    section_name: _ => /[^\]\n\r]+/,

    pair: $ => seq(
      field('key', $.key),
      optional(/[ \t]*/),
      field('separator', $.separator),
      optional(/[ \t]*/),
      field('value', optional($.value))
    ),

    key: _ => /[A-Za-z0-9_.-]+/,

    separator: _ => choice('=', ':'),

    value: _ => /[^\n\r;#]*/,

    comment: _ => token(seq(choice(';', '#'), /[^\n\r]*/)),

    newline: _ => /\r?\n/,
  },
});
