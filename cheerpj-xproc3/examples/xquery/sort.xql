xquery version "3.0" encoding "UTF-8";

declare variable $elm-name as xs:string external;

<things-sorted count="{count(collection()//*[local-name() eq $elm-name])}">
  {
    for $elm in collection()//*[local-name() eq $elm-name]
      order by @id
    return
      $elm
  }
</things-sorted>