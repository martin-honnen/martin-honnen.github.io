xquery version "3.0" encoding "UTF-8";

<things-sorted count="{count(collection()//thing)}">
  {
    for $thing in collection()//thing
      order by @id
    return
      $thing
  }
</things-sorted>