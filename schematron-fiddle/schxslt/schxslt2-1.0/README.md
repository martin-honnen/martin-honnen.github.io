# SchXslt2 Schematron to XSLT 3.0 transpiler

SchXslt2 is the second iteration of SchXslt, a modern XSLT-based implementation of the ISO Schematron validation
language (ISO/IEC-19757:3).

SchXslt2 Schematron to XSLT 3.0 transpiler is copyright by David Maus &lt;dmaus@dmaus.name&gt; and released under the
terms of the MIT license.

## Usage

Use the transpiler to create an XSLT transformation that processes a document and returns a SVRL (Schematron Validation
Reporting Language) report.

## Transpiler parameters

### schxslt:phase

Name of the validation phase. The value ```'#DEFAULT'``` selects the pattern in the ```sch:schema/@defaultPhase```
attribute or ```'#ALL'```, if this attribute is not present. The value ```'#ALL'``` selects all patterns. Defaults to
```'#DEFAULT'```.

### schxslt:streamable

Set to boolean ```true``` to create a streamable validation stylesheet. This *does not* check the streamability of XPath
expressions in rules, assertions, variables etc. It merely declares the modes in the validation stylesheet to be
streamable and removes the ```@location``` attribute from the SVRL output when no location function is given because the
default ```fn:path()``` is not streamable. Defaults to ```false```.

### schxslt:location-function

Name of a ```function f($context as node()) as xs:string``` that provides location information for the SVRL
report. Defaults to ```fn:path()``` when not set.

## Enhancements

### Typed variables

[Proposal 1](https://github.com/Schematron/schematron-enhancement-proposals/issues/1)

The Schematron specification does not allow for annotating variables with the expected type of its value. Type
annotations are helpful to make the most of XSLT 3.0. Using them is current best practice.

This proposal adds support for an ```@as``` attribute on variable declarations.

### Global abstract rules

[Proposal 3](https://github.com/Schematron/schematron-enhancement-proposals/issues/3)

The Schematron specification limits the the reuse of abstract rules to the current pattern element. The ```@href
attribute``` on ```extends``` was introduced in 2016 to overcome this limitation but requires a schema author to
externalize abstract rules for them to be used.

This proposal extends Schematron with a top-level ```rules``` element to hold abstract rules that are globally
referable by the ```@rule``` attribute of ```extends```.

### Additional XSLT elements

[Proposal 4](https://github.com/Schematron/schematron-enhancement-proposals/issues/4)

The Schematron specification allows the XSLT elements ```function``` and ```key``` to be used in a Schematron
schema. This makes sense because both are required to set up the query language environment. The ```key``` element
prepares data structures for the ```key()``` function and the ```function``` element allows the use of user defined
functions.

This proposal adds support for the following XSLT elements:

* xsl:accumulator
* xsl:import
* xsl:import-schema
* xsl:include
* xsl:use-package

## Limitations

SchXslt2 does not implement proper scoping rules of pattern and phase variables. Schema, pattern, and phase variables
are all implemented as global XSLT variables. As a consequence, the name of a schema, pattern, or phase variable MUST be
unique in the entire schema.
