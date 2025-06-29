# SchXslt2 Schematron to XSLT 3.0 transpiler

SchXslt2 is the second iteration of SchXslt, a modern XSLT-based implementation of the ISO Schematron validation
language (ISO/IEC-19757:3).

SchXslt2 Schematron to XSLT 3.0 transpiler is copyright by David Maus &lt;dmaus@dmaus.name&gt; and released under the
terms of the MIT license.

Feedback to SchXslt2 is welcome via [email](mailto:dmaus@dmaus.name) or Codeberg's [issue
management](https://codeberg.org/dmaus/schxslt2/issues).

## Installing

You find the most recent relase [at the projects main repository](https://codeberg.org/dmaus/schxslt2) page. Every
release provides a ZIP file with just the XSLT transpiler for you to download and extract.

In addition, a Java package is published to [Maven Central](https://mvnrepository.com/artifact/name.dmaus.schxslt/schxslt2)
for use with Maven or the Java dependency management tool of your choice.

## Usage

Use the transpiler to create an XSLT transformation that processes a document and returns a SVRL (Schematron Validation
Reporting Language) report.

## Transpiler parameters

### schxslt:debug as xs:boolean

Enable or disable debugging. When debugging is enabled, the validation stylesheet is indented. Defaults to false.

### schxslt:phase as xs:string?

Name of the validation phase. The value ```'#DEFAULT'``` selects the pattern in the ```sch:schema/@defaultPhase```
attribute or ```'#ALL'```, if this attribute is not present. The value ```'#ALL'``` selects all patterns. Defaults to
```'#DEFAULT'```.

### schxslt:streamable as xs:boolean

Set to boolean ```true``` to create a streamable validation stylesheet. This *does not* check the streamability of XPath
expressions in rules, assertions, variables etc. It merely declares the modes in the validation stylesheet to be
streamable and removes the ```@location``` attribute from the SVRL output when no location function is given because the
default ```fn:path()``` is not streamable. Defaults to ```false```.

### schxslt:location-function as xs:string?

Name of a ```function f($context as node()) as xs:string``` that provides location information for the SVRL
report. Defaults to ```fn:path()``` when not set.

### schxslt:expand-text as xs:boolean

When set to boolean ```true```, the validation stylesheet globally enables text value templates, and you may use them in
assertion or diagnostic messages. Defaults to ```false```.

### schxslt:fail-early as xs:boolean

When set to boolean ```true```, the validation stylesheet stops as soon as it encounters the first failed assertion or
successful report. Defaults to ```false```.

### schxslt:terminate-validation-on-error as xs:boolean

When set to boolean ```true```, the validation stylesheet terminates the XSLT processor when it encounters a dynamic
error. Defaults to ```true```.

### schxslt:report-active-pattern as xs:boolean

When set to boolean ```true```, the validation stylesheet reports active patterns and groups. Defaults to ```true```.

### schxslt:report-fired-rule as xs:boolean

When set to boolean ```true```, the validation stylesheet reports fired rules. Defaults to ```true```.

### schxslt:report-suppressed-rule as xs:boolean

When set to boolean ```true```, the validation stylesheet reports suppressed rules. Defaults to ```true```.

## Schematron 4 (2025)

As of version 1.4 SchXslt2 supports all but one feature of the 2025 edition of ISO Schematron (see limitations).

Namely:

* typed variables (supported since version 1.0)
* top-level &lt;rules&gt; element (supported since version 1.0)
* base URI and language fixup (supported since version 1.0)
* restrict validation to a subset of the document (&lt;phase&gt;/@from)
* attribute to express the relative importance of an assertion (&lt;assert&gt;/@severity, &lt;report&gt;/@severity)
* refined rule context (&lt;rule&gt;/@visit-each)
* rule sets (&lt;group&gt;)
* libraries containing external declarations (&lt;library&gt;)
* dynamic evaluation of @flag, @role, @severity
* schema-level parameters (&lt;param&gt;)

## Enhancements

### Typed schema parameters

Schema parameters ```sch:schema/sch:param``` may declare an ```@as``` attribute denoting the expected type of the
parameter.

### Report suppressed rules

A Schematron pattern acts as an if-then-else statement for the contained rules. That is, a rule does not fire for an
item if this item was matched by a lexically previous rule. If the validation stylesheet recognizes this happening, it
reports an ```svrl:suppressed-rule``` element with the same content model as ```svrl:fired-rule```.

### Introspection

Expressions in the validation stylesheet can access the effective phase it was compiled for by using the global variable
```Q{http://dmaus.name/ns/2023/schxslt}phase```.

### Logging dynamic errors

Dynamic errors during validation are logged by a svrl:error element (see [Proposal
69](https://github.com/Schematron/schematron-enhancement-proposals/issues/69)).

Unless the static parameter ```schxslt:terminate-validation-on-error``` is set to ```false``` the validation stylesheet still
terminates the XSLT processor.

### Attribute value templates

You can use attribute value templates in the ```@flag```, ```@role```, and ```@severity```.

## Limitations

SchXslt2 does not implement proper scoping rules of pattern and phase variables. Schema, pattern, and phase variables
are all implemented as global XSLT variables. As a consequence, the name of a schema, pattern, or phase variable MUST be
unique in the entire schema.

SchXslt2 does not support dynamic phase selection using the ```@when``` attribute on the ```sch:phase``` element.
