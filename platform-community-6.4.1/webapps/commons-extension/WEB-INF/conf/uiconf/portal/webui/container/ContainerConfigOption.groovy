/**
 * Copyright (C) 2009 eXo Platform SAS.
 * 
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 * 
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */

import org.exoplatform.webui.core.model.SelectItemCategory ;
import org.exoplatform.webui.core.model.SelectItemOption ;
  
  List templates = new ArrayList() ;
  
  SelectItemCategory table = new SelectItemCategory("table");
    table.addSelectItemOption(new SelectItemOption("simpleTable",
        "<container template=\"system:/groovy/portal/webui/container/UISimpleTableContainer.gtmpl\"></container>",
        "SimpleTableContainerLayout"));
  templates.add(table);
  
  SelectItemCategory row = new SelectItemCategory("row");
    row.addSelectItemOption(new SelectItemOption("simpleRow",
        "<container template=\"system:/groovy/portal/webui/container/UISimpleRowContainer.gtmpl\"></container>",
        "SimpleRowContainerLayout"));
  templates.add(row);
  
  SelectItemCategory column = new SelectItemCategory("column") ;
    column.addSelectItemOption(new SelectItemOption("simpleColumn",
        "<container template=\"system:/groovy/portal/webui/container/UIResponsiveColumnGroupContainer.gtmpl\">" +
        "  <container template=\"system:/groovy/portal/webui/container/UISimpleColumnContainer.gtmpl\">" +
        "  <factory-id>SimpleColumnContainer</factory-id>" +
        "  </container>" +
        "</container>",
        "SimpleColumnContainerLayout")) ;
  templates.add(column);

return templates;
