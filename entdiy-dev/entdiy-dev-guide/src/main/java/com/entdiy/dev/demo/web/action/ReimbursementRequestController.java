package com.entdiy.dev.demo.web.action;

import com.entdiy.core.annotation.MenuData;
import com.entdiy.core.annotation.MetaData;
import com.entdiy.core.service.BaseService;
import com.entdiy.core.web.BaseController;
import com.entdiy.core.web.json.JsonViews;
import com.entdiy.core.web.view.OperationResult;
import com.entdiy.dev.demo.entity.ReimbursementRequest;
import com.entdiy.dev.demo.entity.ReimbursementRequestItem;
import com.entdiy.dev.demo.service.ReimbursementRequestService;
import com.entdiy.security.AuthContextHolder;
import com.fasterxml.jackson.annotation.JsonView;
import com.google.common.collect.Lists;
import org.apache.commons.collections.CollectionUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@MetaData("报销申请管理")
@Controller
@RequestMapping(value = "/dev/demo/reimbursement-request")
public class ReimbursementRequestController extends BaseController<ReimbursementRequest, Long> {

    @Autowired
    private ReimbursementRequestService reimbursementRequestService;

    @Override
    protected BaseService<ReimbursementRequest, Long> getEntityService() {
        return reimbursementRequestService;
    }

    @ModelAttribute
    public void prepareModel(HttpServletRequest request, Model model, @RequestParam(value = "id", required = false) Long id) {
        super.initPrepareModel(request, model, id);
    }

    @MenuData("演示样例:报销申请")
    @RequiresPermissions("演示样例:报销申请")
    @RequestMapping(value = "", method = RequestMethod.GET)
    public String index(Model model) {
        return "dev/demo/reimbursementRequest-index";
    }

    @RequiresPermissions("演示样例:报销申请")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    @JsonView(JsonViews.Admin.class)
    public Page<ReimbursementRequest> findByPage(HttpServletRequest request) {
        return super.findByPage(ReimbursementRequest.class, request);
    }

    @RequestMapping(value = "/edit-tabs", method = RequestMethod.GET)
    public String editTabs(HttpServletRequest request) {
        return "dev/demo/reimbursementRequest-inputTabs";
    }

    @RequiresPermissions("演示样例:报销申请")
    @RequestMapping(value = "/edit", method = RequestMethod.GET)
    public String editShow(Model model) {
        ReimbursementRequest entity = fetchEntityFromModel(model);
        if (entity.isNew()) {
            //默认取当前登录用户所属部门，用户可编辑修改
            entity.setDepartment(AuthContextHolder.findAuthUser().getDepartment());
        }

        //模板记录初始化及属性设置
        ReimbursementRequestItem newItemTemplate = new ReimbursementRequestItem();
        newItemTemplate.setStartDate(new Date());
        //将追加模板记录添加到集合用于前端循环显示
        List<ReimbursementRequestItem> reimbursementRequestItems = entity.getReimbursementRequestItems();
        if (CollectionUtils.isEmpty(reimbursementRequestItems)) {
            reimbursementRequestItems = Lists.newArrayList();
            entity.setReimbursementRequestItems(reimbursementRequestItems);
        }
        reimbursementRequestItems.add(newItemTemplate);

        return "dev/demo/reimbursementRequest-inputBasic";
    }

    @RequiresPermissions("演示样例:报销申请")
    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public OperationResult editSave(@ModelAttribute("entity") ReimbursementRequest entity, Model model) {
        if (entity.isNew()) {
            entity.setUser(AuthContextHolder.findAuthUser());
            List<ReimbursementRequestItem> items = entity.getReimbursementRequestItems();
            for (ReimbursementRequestItem item : items) {
                item.setReimbursementRequest(entity);
            }
        }
        return super.editSave(entity);
    }

    @RequiresPermissions("演示样例:报销申请")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public OperationResult delete(@RequestParam("ids") Long... ids) {
        return super.delete(ids);
    }
}