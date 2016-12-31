<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">

	<xsl:output method="html" indent="no"/>
	<xsl:strip-space elements="*"/>
	
	<xsl:template match="severeinjury">
		<table class="table table-striped" id="severeInjuryTable">
			<thead>
				<tr>
					<th data-placeholder="ID">ID</th>
					<th data-placeholder="ID">UPA</th>
					<th data-placeholder="yyyy/mm/dd">Date</th>
					<th data-placeholder="Employer">Employer</th>
					<th data-placeholder="Address">Address</th>
					<th data-placeholder="City">City</th>
					<th class="filter-select" data-placeholder="Select State">ST</th>
					<th data-placeholder="Zip">Zip</th>
					<th data-placeholder="NAICS">Primary NAICS</th>
					<th  class="filter-select" data-placeholder="Select Result">Result</th>
					<th data-placeholder="Inspection#">Insp #</th>
					<th data-placeholder="Narrative">Final Narrative</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th colspan="12" class="ts-pager form-horizontal">
						<button type="button" class="btn first" title="First Page"><i class="icon-step-backward glyphicon glyphicon-step-backward"></i></button>
						<button type="button" class="btn prev" title="Previous Page"><i class="icon-arrow-left glyphicon glyphicon-backward"></i></button>
						<span class="pagedisplay"></span> <!-- this can be any element, including an input -->
						<button type="button" class="btn next" title="Next Page"><i class="icon-arrow-right glyphicon glyphicon-forward"></i></button>
						<button type="button" class="btn last" title="Last Page"><i class="icon-step-forward glyphicon glyphicon-step-forward"></i></button>
						<select class="pagesize input-mini" title="Select page size">
							<option selected="selected" value="10">10</option>
							<option value="25">25</option>
							<option value="50">50</option>
							<option value="75">75</option>
							<option value="100">100</option>
						</select>
						<select class="pagenum input-mini" title="Select page number"></select>
					</th>
				</tr>
			</tfoot>
			<tbody>
				<xsl:for-each select="record">
					<xsl:sort select="eventDate" />
					<tr>
						<td><xsl:value-of select="ID" /></td>
						<td><xsl:value-of select="upa" /></td>
						<td><xsl:value-of select="eventDate" /></td>
						<td><xsl:value-of select="employer" /></td>
						<td><xsl:value-of select="address" /> <xsl:value-of select="address2" /></td>
						<td><xsl:value-of select="city" /></td>
						<td><xsl:value-of select="state" /></td>
						<td><xsl:value-of select="zip" /></td>
						<td><xsl:value-of select="NAICS" /></td>
						<xsl:choose>
							<xsl:when test="Hospitalized = 1">
								<td>Hospitalized</td>
							</xsl:when>
							<xsl:when test="Amputation = 1">
								<td>Amputation</td>
							</xsl:when>
							<xsl:when test="Hospitalized = 0">
								<td>Amputation</td>
							</xsl:when>
							<xsl:when test="Amputation = 0">
								<td>Hospitalized</td>
							</xsl:when>
						</xsl:choose>
						<td>
							<a title="View the inspection details for this case" href="{inspectionNumber}" target="_blank">
								<xsl:value-of select="inspectionNumber" />
							</a>
						</td>
						<td><xsl:value-of select="finalNarrative" /> 
							<div class="mocktable">
								<div class="mockrow">
									<div class="mockcell center"><xsl:value-of select="nid" /></div>
									<div class="mockcell center"><xsl:value-of select="pid" /></div>
									<div class="mockcell center"><xsl:value-of select="eid" /></div>
									<div class="mockcell center"><xsl:value-of select="sid" /><xsl:text> </xsl:text><xsl:value-of select="ssid" /></div>
								</div>
								<div class="mockrow">
									<div class="mockcell"><xsl:value-of select="ntitle" /></div>
									<div class="mockcell"><xsl:value-of select="ptitle" /></div>
									<div class="mockcell"><xsl:value-of select="etitle" /></div>
									<div class="mockcell"><xsl:value-of select="stitle" /><xsl:text> </xsl:text><xsl:value-of select="sstitle" /></div>
								</div>
							</div>
						</td>
					</tr>
				</xsl:for-each>
			</tbody>
		</table>
	</xsl:template>

</xsl:stylesheet>