define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"], function(require, exports, module){"use strict";
var Range = require("../range").Range;
var MatchingBraceOutdent = function () { };
(function () {
    this.checkOutdent = function (line, input) {
        if (!/^\s+$/.test(line))
            return false;
        return /^\s*\}/.test(input);
    };
    this.autoOutdent = function (doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);
        if (!match)
            return 0;
        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({ row: row, column: column });
        if (!openBracePos || openBracePos.row == row)
            return 0;
        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column - 1), indent);
    };
    this.$getIndent = function (line) {
        return line.match(/^\s*/)[0];
    };
}).call(MatchingBraceOutdent.prototype);
exports.MatchingBraceOutdent = MatchingBraceOutdent;

});

define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(require, exports, module){"use strict";
var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;
var FoldMode = exports.FoldMode = function (commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start));
        this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end));
    }
};
oop.inherits(FoldMode, BaseFoldMode);
(function () {
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    this._getFoldWidgetBase = this.getFoldWidget;
    this.getFoldWidget = function (session, foldStyle, row) {
        var line = session.getLine(row);
        if (this.singleLineBlockCommentRe.test(line)) {
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
        return fw;
    };
    this.getFoldWidgetRange = function (session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;
            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                }
                else if (foldStyle != "all")
                    range = null;
            }
            return range;
        }
        if (foldStyle === "markbegin")
            return;
        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;
            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);
            return session.getCommentFoldRange(row, i, -1);
        }
    };
    this.getSectionRange = function (session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                }
                else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                }
                else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    this.getCommentRegionBlock = function (session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m)
                continue;
            if (m[1])
                depth--;
            else
                depth++;
            if (!depth)
                break;
        }
        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };
}).call(FoldMode.prototype);

});

define("ace/mode/xpath_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var XPathHighlightRules = function () {
    var keywordControl = ("for|let|in|return|if|then|else|some|every|satisfies");
    var keywordOther = ("to|union|intersect|except|as|at");
    var storageTypes = ("xs|fn|local|qname|any|element|attribute|schema");
    var constructorTypes = ("map|array|function|item|node|empty-sequence");
    var logicalOps = "and|or";
    var arithOps = "\\+|\\-|\\*|div|idiv|mod";
    var compOpsSymbolic = "<<|>>|<=|>=|=|!=|<|>";
    var compOpsWord = "eq|ne|le|ge|lt|gt|is";
    var axisNames = "child|descendant|attribute|self|descendant-or-self|following-sibling|following|parent|ancestor|preceding-sibling|preceding|ancestor-or-self|namespace";
    var keywordPhrases = "(?:instance\\s+of|treat\\s+as|castable\\s+as|cast)";
    var numberRe = "\\b(?:[0-9]+(?:\\.[0-9]*)?|\\.[0-9]+)(?:[eE][+-]?[0-9]+)?\\b";
    var variableRe = "\\$[\\w-]+";
    var funcNameRe = "\\b[\\w-]+\\b(?=\\s*\\()";
    var keywordMapper = this.createKeywordMapper({
        "keyword.control": keywordControl,
        "keyword.other": keywordOther,
        "storage.type": storageTypes
    }, "identifier", true);
    this.$rules = {
        start: [
            {
                token: "comment.block.start",
                regex: "\\(\\:",
                push: "comment"
            },
            {
                token: "string.quoted.double",
                regex: "\"",
                push: "dqstring"
            },
            {
                token: "string.quoted.single",
                regex: "'",
                push: "sqstring"
            },
            {
                token: "constant.numeric",
                regex: numberRe
            },
            {
                token: "keyword.other",
                regex: "\\b" + keywordPhrases + "\\b"
            },
            {
                token: "keyword.operator.logical",
                regex: "\\b(?:" + logicalOps + ")\\b"
            },
            {
                token: "keyword.operator.comparison",
                regex: "(?:" + compOpsSymbolic + ")"
            },
            {
                token: "keyword.operator.comparison",
                regex: "\\b(?:" + compOpsWord + ")\\b"
            },
            {
                token: "keyword.operator.arithmetic",
                regex: "(?:" + arithOps + ")"
            },
            {
                token: "keyword.operator.navigation",
                regex: "\\/\\/"
            },
            {
                token: "keyword.operator.navigation",
                regex: "\\/|\\|"
            },
            {
                token: "keyword.operator.map",
                regex: "=>|!"
            },
            {
                token: "entity.name.axis",
                regex: "\\b(?:" + axisNames + ")(?=::)"
            },
            {
                token: "punctuation.separator.axis",
                regex: "::"
            },
            {
                token: "constant.other",
                regex: "\\.\\.|\\."
            },
            {
                token: "variable.other",
                regex: variableRe
            },
            {
                token: "entity.name.function",
                regex: funcNameRe
            },
            {
                token: "storage.type",
                regex: "\\b(?:" + constructorTypes + ")\\b"
            },
            {
                token: "paren.lparen",
                regex: "[\\(\\[\\{]"
            },
            {
                token: "paren.rparen",
                regex: "[\\)\\]\\}]"
            },
            {
                token: keywordMapper,
                regex: "[A-Za-z_][\\w-]*\\b"
            },
            {
                token: "text",
                regex: "\\s+"
            }
        ],
        comment: [
            {
                token: "comment.block.start",
                regex: "\\(\\:",
                push: "comment"
            },
            {
                token: "comment.block.end",
                regex: "\\:\\)",
                next: "pop"
            },
            {
                defaultToken: "comment.block"
            }
        ],
        dqstring: [
            {
                token: "string.quoted.double.escaped",
                regex: "\"\""
            },
            {
                token: "string.quoted.double",
                regex: "\"",
                next: "pop"
            },
            {
                defaultToken: "string.quoted.double"
            }
        ],
        sqstring: [
            {
                token: "string.quoted.single.escaped",
                regex: "''"
            },
            {
                token: "string.quoted.single",
                regex: "'",
                next: "pop"
            },
            {
                defaultToken: "string.quoted.single"
            }
        ]
    };
    this.normalizeRules();
};
oop.inherits(XPathHighlightRules, TextHighlightRules);
exports.XPathHighlightRules = XPathHighlightRules;

});

define("ace/mode/xpath",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle","ace/mode/xpath_highlight_rules"], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;
var XPathHighlightRules = require("./xpath_highlight_rules").XPathHighlightRules;
var Mode = function () {
    this.HighlightRules = XPathHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new CStyleFoldMode();
    this.blockComment = { start: "(:", end: ":)" };
    this.lineCommentStart = null;
};
oop.inherits(Mode, TextMode);
(function () {
    this.$id = "ace/mode/xpath";
    this.getNextLineIndent = function (state, line, tab) {
        return this.$getIndent(line);
    };
    this.checkOutdent = function (state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };
    this.autoOutdent = function (state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };
}).call(Mode.prototype);
exports.Mode = Mode;

});
                (function() {
                    window.require(["ace/mode/xpath"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            