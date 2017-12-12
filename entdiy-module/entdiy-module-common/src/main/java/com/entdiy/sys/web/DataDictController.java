/**
 * Copyright © 2015 - 2017 EntDIY JavaEE Development Framework
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.entdiy.sys.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.entdiy.core.annotation.MenuData;
import com.entdiy.core.annotation.MetaData;
import com.entdiy.core.pagination.GroupPropertyFilter;
import com.entdiy.core.pagination.PropertyFilter;
import com.entdiy.core.pagination.PropertyFilter.MatchType;
import com.entdiy.core.service.BaseService;
import com.entdiy.core.web.BaseController;
import com.entdiy.core.web.view.OperationResult;
import com.entdiy.sys.entity.DataDict;
import com.entdiy.sys.service.DataDictService;

import org.apache.commons.collections.CollectionUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/admin/sys/data-dict")
public class DataDictController extends BaseController<DataDict, Long> {

    @Autowired
    private DataDictService dataDictService;

    @Override
    protected BaseService<DataDict, Long> getEntityService() {
        return dataDictService;
    }

    @MenuData("配置管理:系统管理:数据字典")
    @RequiresPermissions("配置管理:系统管理:数据字典")
    @RequestMapping(value = "", method = RequestMethod.GET)
    public String index(Model model) {
        return "admin/sys/dataDict-index";
    }

    @Override
    protected void appendFilterProperty(GroupPropertyFilter groupPropertyFilter) {
        if (groupPropertyFilter.isEmptySearch()) {
            groupPropertyFilter.forceAnd(new PropertyFilter(MatchType.NU, "parent", true));
        }
        super.appendFilterProperty(groupPropertyFilter);
    }

    @RequiresPermissions("配置管理:系统管理:数据字典")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Page<DataDict> findByPage(HttpServletRequest request) {
        return super.findByPage(DataDict.class, request);
    }

    @RequiresPermissions("配置管理:系统管理:数据字典")
    @RequestMapping(value = "/edit", method = RequestMethod.GET)
    public String editShow() {
        return "admin/sys/dataDict-inputBasic";
    }

    @RequiresPermissions("配置管理:系统管理:数据字典")
    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public OperationResult editSave(@ModelAttribute("entity") DataDict entity, Model model) {
        return super.editSave(entity);
    }

    @RequiresPermissions("配置管理:系统管理:数据字典")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public OperationResult delete(HttpServletRequest request, @ModelAttribute("entity") DataDict entity) {
        //基于提交请求参数判断用户是否已经进行确认过，如果否则进行后续的业务逻辑校验及反馈提示，如果已确认则直接通过
        if (postNotConfirmedByUser(request)) {
            List<DataDict> children = entity.getChildren();
            //反馈信息待用户进行confirm确认，如果用户确认OK则自动再次发起请求
            if (CollectionUtils.isNotEmpty(children)) {
                return OperationResult.buildConfirmResult("如果删除当前项目将递归删除所有子项");
            }
        }
        return super.delete(entity.getId());
    }

    @RequiresUser
    @ModelAttribute
    public void prepareModel(HttpServletRequest request, Model model, @RequestParam(value = "id", required = false) Long id) {
        super.initPrepareModel(request, model, id);
    }

    @MetaData(value = "级联子数据集合")
    @RequestMapping(value = "/children", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, String> children(HttpServletRequest request, @RequestParam(value = "id") Long id) {
        return dataDictService.findMapDataById(id);
    }
}
