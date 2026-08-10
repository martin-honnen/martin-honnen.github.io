<sch:schema xmlns:sch="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt3">
   <sch:pattern>
       <sch:rule context="table">
            <sch:let name="minColumsNo" value="min(.//tr/count(td))"/>
            <sch:let name="reqColumsNo" value="max(.//tr/count(td))"/>

            <!-- Check the number of cells on each row -->
            <sch:assert test="$minColumsNo >= $reqColumsNo">Cells are missing. (The number of cells for each row must be <sch:value-of select="$reqColumsNo"/>)</sch:assert>
        </sch:rule>
   </sch:pattern>
</sch:schema>