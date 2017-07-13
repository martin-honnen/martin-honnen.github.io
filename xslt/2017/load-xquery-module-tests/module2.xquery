module namespace f2 = "http://example.com/f2";
import module namespace f1 = "http://example.com/f1" at "module1.xquery";
declare %public function f2:bar($input as xs:string) as xs:string {
  f1:foo() || ': ' || $input
};