module namespace f4 = "http://example.com/f4";
import module namespace f3 = "http://example.com/f3" at "sub-modules/module3.xquery";
declare %public function f4:bar($input as xs:string) as xs:string {
  f3:foo() || ': ' || $input
};