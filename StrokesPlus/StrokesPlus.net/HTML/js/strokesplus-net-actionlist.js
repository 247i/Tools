/********************************************************************************************
    ActionList
*********************************************************************************************/

class ActionList {

    constructor(container, application, gestureWidth, gestureHeight) {

        this.Id = `actionlist_${application.Description}_${Date.now()}`.idname();
        this.Container = container;
        this.Application = application;
        this.ActionItems = [];
        this.GestureWidth = gestureWidth || 125;
        this.GestureHeight = gestureHeight || 125;
        this.ActionEditor = new ActionEditor(`actioneditor_${this.Id}`, this);
        this.CurrentActionItem;
        this.ToolbarItemTarget;
        this.SelectedItemName = '';
        this.Load();

    }

    get HTML() {

        return `<div class="container-fluid">
                    <div class="row flex-nowrap">
                        <div id="${this.Id}" class="d-block">
                            <div id="accordion_${this.Id}" class="actionListAccordion">
                                <div class="actionListToolbar">${this.ToolbarHTML()}</div>
                                <div class="actionListCardContainer">                            
                                    ${this.AccordionHTML}
                                </div>
                            </div>
                        </div>
                        <div id="${this.ActionEditor.Id}" class="pl-3 d-block flex-fill actionEditor"></div>
                    </div>
                </div>`;

    }

    get AddActionModalAttributes() {
        return `data-toggle="modal"
                data-target="#modalStandardCenter"
                data-title="${stringEscapeProperty(`||AddAction||`)}"
                data-body="<input type='text' id='addActionName' class='w-100 form-control' placeholder='${stringEscapeProperty(`||Name||`)}' />"
                data-buttons="ok|window.currentSection.ActionList.AddAction(),cancel|modalDismissStandardCenter"
                data-addclass="modal-dialog-md"
                data-showcallback="$('#addActionName').focus()"`;
    }

    AddAction() {
        //TODO: Check for name collision
        //TODO: Create new item, update UI, select action
        let actionName = $('#addActionName').val();
        log(`AddAction() - input: ${actionName}`);
        modalDismissStandardCenter();
        window.currentSection.ActionList.PostToolbarItem();
    }

    get AddCategoryModalAttributes() {
        return `data-toggle="modal"
                data-target="#modalStandardCenter"
                data-title="${stringEscapeProperty(`||AddCategory||`)}"
                data-body="<input type='text' id='addCategoryName' class='w-100 form-control' placeholder='${stringEscapeProperty(`||Name||`)}' />"
                data-buttons="ok|window.currentSection.ActionList.AddCategory(),cancel|modalDismissStandardCenter"
                data-addclass="modal-dialog-md"
                data-showcallback="$('#addCategoryName').focus()"`;
    }

    AddCategory() {
        //TODO: Check for name collision
        //TODO: Add category, update UI
        let categoryName = $('#addCategoryName').val();
        log(`AddCategory() - input: ${categoryName}`);
        modalDismissStandardCenter();
        window.currentSection.ActionList.PostToolbarItem();
    }

    AdjustHeight() {

        navSetTabsWidth();
        log('footer top: ' + $('.footer').position().top);
        log('actionlist top: ' + $(`#${this.Id}`).position().top);
        let height = $('.footer').position().top - $(`#${this.Id}`).position().top;
        $(`#accordion_${this.Id}`).height(height);
        this.ActionEditor.SetHeight(height);
        let actionListWidth = parseInt($(`#accordion_${this.Id}`).width());
        appSettings.SettingsActionListWidth = actionListWidth < 150 ? 300 : actionListWidth;
        log('ActionList.AdjustHeight');

    }

    CheckActionConflicts(noAlert) {

        let actionItemList = { 
            Application: this.Application,
            Id: this.Id,
            ActionItems: []
        };
        this.ActionItems.forEach(function(val, index) {
            actionItemList.ActionItems.push({ Action: val.Action, Id: val.Id });
        });
        hostPostMessage('CheckActionConflicts', noAlert, actionItemList);    

    }

    Copy() {

        log('Copy()');
        window.currentSection.ActionList.PostToolbarItem();
    }

    Cut() {

        log('Cut()');
        window.currentSection.ActionList.PostToolbarItem();
    }

    get DeleteConfirmModalAttributes() {
        return `data-toggle="modal"
                data-target="#modalStandardCenter"
                data-title="${stringEscapeProperty(`||Delete||`)}"
                data-body="${stringEscapeProperty(`||GenericDeleteConfirmMessage||`)}"
                data-buttons="delete|window.currentSection.ActionList.Delete(),cancel|modalDismissStandardCenter"
                data-addclass="modal-sm"`;
    }

    Delete() {

        log('Delete()');
        modalDismissStandardCenter();
        window.currentSection.ActionList.PostToolbarItem();
    }

    Export() {

        log('Export()');
        window.currentSection.ActionList.PostToolbarItem();
    }

    get AccordionHTML() {

        let accordionHTML = "";
        let sortedCategories = this.Categories; 
    
        for(let c = 0; c < sortedCategories.length; c++) {
            accordionHTML += this.GetCategoryHTML(sortedCategories[c], this.ActionItems.filter(a => a.Action.Category === sortedCategories[c])) + '\n';
        }
    
        return accordionHTML;

    }

    get Categories() {

        return [...new Set(this.Application.Categories)].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'accent' }));

    }

    GetCategory(category) {

        return $(`#collapsecategory_${category.idname()}_${this.Id}`);

    }

    GetCategoryHTML(category, actionItems) {

        return `<div class="card">
                    <div class="actionCategory card-header" 
                         id="category_${category.idname()}_${this.Id}" 
                         data-name="${category}"
                         data-toggle="collapse" 
                         data-target="#collapsecategory_${category.idname()}_${this.Id}" 
                         aria-expanded="${((window.currentSection instanceof SectionGlobalActions && appSettings.LastGlobalActionCategory === category) || (!(window.currentSection instanceof SectionGlobalActions) && appSettings.LastApplicationCategory == category))}">
                        <h5 class="mb-0">
                            ${stringEscapeHtml(category)}
                        </h5>
                    </div>
    
                    <div class="collapse"
                         id="collapsecategory_${category.idname()}_${this.Id}"  
                         data-parent="#${this.Id}"
                         aria-labelledby="category_${category.idname()}_${this.Id}">
                        ${this.GetCategoryItemsHTML(actionItems)}
                    </div>
                </div>`;
    
    }

    GetCategoryItemsHTML(actionItems) {
    
        let actionsHTML = "";
        let sortedActions = actionItems.sort((a, b) => a.Action.Description.localeCompare(b.Action.Description, undefined, { sensitivity: 'accent' }))
        for(let i = 0; i < sortedActions.length; i++) {
            actionsHTML += sortedActions[i].HTML + "\n";
        }
        return actionsHTML;
    
    }    

    Import() {

        log('Import()');
        window.currentSection.ActionList.PostToolbarItem();
    }

    Load() {

        for(let i = 0; i < this.Application.Actions.length; i++){
            this.ActionItems.push(new ActionListItem(this, this.Application.Actions[i]));
        }

    } 
    
    OnContextMenu(event) {

        if (!event.altKey && !event.ctrlKey && !event.shiftKey) { 
            event.preventDefault();

            if(skipNextContextMenu) {
                skipNextContextMenu = false;
                return;
            }

            if($('.modal.in, .modal.show').length) {
                return false;
            }

            if($('.custom-menu').css('display') === 'none') {

                $(`#accordion_${window.currentSection.ActionList.Id} .actionCategory.card-header`).removeClass('active');

                let target = $(event.target);
                if(target.closest('.actionlistitem').length > 0 && !target.closest('.actionlistitem').hasClass('active')) {
                    target.click();
                }

                let pasteNotAvailableClass = 'd-none'; //TODO
                if(copyContents) {
                    pasteNotAvailableClass = '';
                }
                let hideItemClass = 'd-none';
                let hideItemDivider = 'divider';
                let targetItem = null;
                let targetName = "";
                let hideAddActionClass = "";
                if(target.hasClass('actionListAccordion')) {
                    targetItem = null;
                    hideAddActionClass = 'd-none';
                } else if(target.closest('.actionlistitem').length > 0) {
                    targetItem = window.currentSection.ActionList.CurrentActionItem;
                    hideItemClass = '';
                    hideItemDivider = '';
                    targetName = targetItem.Action.Description;
                } else if(target.closest('.actionCategory').length > 0) {
                    target.closest('.actionCategory').addClass('active');
                    targetItem = target.closest('.actionCategory').data('name');
                    hideItemClass = '';
                    hideItemDivider = '';
                    targetName = targetItem;
                }
                window.currentSection.ActionList.ToolbarItemTarget = targetItem;
                window.currentSection.ActionList.SelectedItemName = targetName;

                window.OnContextMenuItemClick = this.OnContextMenuItemClick;

                window.currentSection.ActionList.UpdateToolbar();

                // Show contextmenu
                $(".custom-menu")
                    .html(`
                            <li ${this.AddCategoryModalAttributes}>
                                ||AddCategory||
                            </li>
                            <li class="${hideAddActionClass}"
                                ${this.AddActionModalAttributes}>
                                ||AddAction||
                            </li>
                            <li class="divider ${hideItemClass}" 
                                data-menudata="ToggleActive">
                                ||ToggleActive||
                            </li>
                            <li class="${hideItemClass}" ${this.RenameModalAttributes}>
                                ||Rename||
                            </li>
                            <li class="${hideItemClass}"
                                data-menudata="Copy">
                                ||Copy||
                            </li>
                            <li class="${hideItemDivider} ${pasteNotAvailableClass}"
                                data-menudata="Paste">
                                ||Paste||
                            </li>
                            <li class="${hideItemClass}"
                                ${this.DeleteConfirmModalAttributes}>
                                ||Delete||
                            </li>
                            <li class="divider" 
                                data-menudata="Import">
                                ||ImportAction||
                            </li>
                            <li class="${hideItemClass}"
                                data-menudata="Export">
                                ||ExportAction||
                            </li>
                        `)
                    .finish()
                    .toggle(0)
                    .css({
                        top: event.pageY + "px",
                        left: event.pageX + "px"
                });
            }
        }
    }

    OnContextMenuItemClick(method) {
        if(window.currentSection.ActionList.ToolbarItemTarget instanceof ActionListItem) {
            log('ActionItem');
        } else if(typeof window.currentSection.ActionList.ToolbarItemTarget === 'string') {
            log('Category');
        } else {
            log('EmptyArea');
        }

        window.currentSection.ActionList.OnToolbarMenuItemClick(null, method);
    }

    OnToolbarMenuItemClick(event, method) {
        if(event) {
            method = $(event.currentTarget).data('method');
        }
        if(window.currentSection.ActionList[method]) {
            window.currentSection.ActionList[method](event);
        } else {
            log(`method: ${method}`);
        }      
    }

    Paste() {

        log('Paste()');
        window.currentSection.ActionList.PostToolbarItem();
    }

    PostRender() {

        this.ActionItems.forEach(function(item, index) {
            item.PostRender();
        });
     
        document.getElementById(`accordion_${this.Id}`).addEventListener("contextmenu", (event) => this.OnContextMenu(event));

        // TODO: Revisit this - minimum size needed for toolbar - and/or toolbar needs to be able to wrap
        $(`#accordion_${this.Id}`).width(appSettings.SettingsActionListWidth < 150 ? 300 : appSettings.SettingsActionListWidth);
    
        if(window.currentSection instanceof SectionGlobalActions) {
            this.SelectAction(this.ActionItems.find(a => a.Action.Category === appSettings.LastGlobalActionCategory && a.Action.Description === appSettings.LastGlobalActionName), true);
        } else {
            this.SelectAction(this.ActionItems.find(a => a.Action.Category === appSettings.LastApplicationCategory && a.Action.Description === appSettings.LastApplicationActionName), true);
        }
       
        new ResizeObserver(settingsResizeElements).observe(document.getElementById(this.Id));

        $(`#accordion_${this.Id}`).on('hidden.bs.collapse', function (e) {
            $(e.target).siblings('.actionCategory.card-header').addClass('active');
            window.currentSection.ActionList.UpdateToolbar();
        });

        $(`#accordion_${this.Id}`).on('shown.bs.collapse', function (e) {
            $(`#accordion_${window.currentSection.ActionList.Id} .actionCategory.card-header`).removeClass('active');
            window.currentSection.ActionList.UpdateToolbar();
        });

        $(`#accordion_${this.Id} .actionListToolbar .toolbarItem`).on('click', function(e){
            window.currentSection.ActionList.OnToolbarMenuItemClick(e);
        });

        $(`#accordion_${this.Id}`).on('click', function(e){
            if(e.button != 2) {
                let target = $(e.target);
                if(target.closest('.actionlistitem').length == 0
                   && target.closest('.actionCategory').length == 0) 
                {
                    $(`#accordion_${window.currentSection.ActionList.Id} .card-body.actionlistitem.active`).removeClass('active');                    
                    $(`#accordion_${window.currentSection.ActionList.Id} .actionCategory.card-header`).removeClass('active');
                    window.currentSection.ActionList.SelectAction(null, false);
                    window.currentSection.ActionList.UpdateToolbar();
                } 
                else if(target.closest('.actionCategory').length > 0
                        /*&& target.closest('.actionCategory').data('name') === window.currentSection.ActionList.CurrentActionItem.Action.Category*/) 
                {
                    $(`#accordion_${window.currentSection.ActionList.Id} .card-body.actionlistitem.active`).removeClass('active');                    
                    window.currentSection.ActionList.SelectAction(null, false);
                    window.currentSection.ActionList.UpdateToolbar();
                }
                log($(`#accordion_${window.currentSection.ActionList.Id} .card-body.actionlistitem.active`));
            }
        });

        this.AdjustHeight();
        this.CheckActionConflicts(false);

    }

    PostToolbarItem() {
        log('PostToolbarItem()');
        window.currentSection.ActionList.ToolbarItemTarget = null;
    }

    get RenameModalAttributes() {
        return `data-toggle="modal"
                data-target="#modalStandardCenter"
                data-title="${stringEscapeProperty(`||Rename||`)}"
                data-body="<input type='text' id='editName' class='w-100' placeholder='${stringEscapeProperty(`||Name||`)}' value='' />"
                data-buttons="ok|window.currentSection.ActionList.Rename(),cancel|modalDismissStandardCenter"
                data-addclass="modal-dialog-md"
                data-showcallback="$('#editName').val(window.currentSection.ActionList.SelectedItemName);$('#editName').select();$('#editName').focus()"`;
    }

    Rename() {
        let newName = $('#editName').val();
        log(`Rename() - New Value: ${newName}`);
        //TODO: Check for name collision
        //TODO: Update name, refresh action item UI
        
        modalDismissStandardCenter();
        window.currentSection.ActionList.PostToolbarItem();
    }

    SaveLastSelection(actionItem) {

        if(window.currentSection instanceof SectionGlobalActions) {
            appSettings.LastGlobalActionCategory = actionItem.Action.Category;
            appSettings.LastGlobalActionName = actionItem.Action.Description;
        } else {
            appSettings.LastApplicationCategory = actionItem.Action.Category;
            appSettings.LastApplicationActionName = actionItem.Action.Description;
        }

    }

    SelectAction(actionItem, scrollIntoView) {

        if(actionItem === null){
            this.ActionEditor.LoadAction(null);
            this.CurrentActionItem = null;
            $(`#${this.Id} .card-body.actionlistitem.active`).removeClass('active');
        } else if(this.CurrentActionItem !== actionItem) {

                $(`#${this.Id} .card-body`).removeClass('active');
                $(`#${actionItem.Id}`).addClass('active');
                $(`#${actionItem.Id}`).closest('.collapse').collapse('show');
                this.SaveLastSelection(actionItem);
                if(scrollIntoView) {
                    setTimeout(function() {
                                            $(`#${actionItem.Id}`)[0].scrollIntoView()
                                        }, 0);
                }
                this.ActionEditor.LoadAction(actionItem);
                this.CurrentActionItem = actionItem;
                this.CurrentActionItem.CheckForConflict();

                //TODO: Maybe create an UpdateToolbar() method and remove from here and ActionItem.Update()
                let openIcon = $(`#${this.Id}`).find(`.toolbarItem[data-method='ToggleActive'] svg.icon-tabler-circuit-switch-open`);
                let closedIcon = $(`#${this.Id}`).find(`.toolbarItem[data-method='ToggleActive'] svg.icon-tabler-circuit-switch-closed`);            
                if(this.CurrentActionItem.Action.Active) {
                    closedIcon.addClass('d-none');
                    openIcon.removeClass('d-none');
                    $(`#${this.Id}`).closest('.card-body').find('h6').removeClass('text-muted');
                } else {
                    openIcon.addClass('d-none');
                    closedIcon.removeClass('d-none');
                    $(`#${this.Id}`).closest('.card-body').find('h6').addClass('text-muted');
                }
            }
            this.UpdateToolbar()
    }    

    ToggleActive() {

        log('ToggleActive()');

        $(`#Active_${window.currentSection.ActionList.ActionEditor.Id}`).trigger('click');
        window.currentSection.ActionList.ActionEditor.Save(false); 

        window.currentSection.ActionList.PostToolbarItem();
    }

    ToolbarHTML() {

        return `<span class="toolbarItem" 
                      data-toolbarmenubutton="AddCategory"
                      data-method="" 
                      title="${stringEscapeProperty(`||AddCategory||`)}"
                      ${this.AddCategoryModalAttributes}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-folder-plus" 
                        width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
                        <line x1="12" y1="10" x2="12" y2="16" />
                        <line x1="9" y1="13" x2="15" y2="13" />
                    </svg>
                </span>

                <span class="toolbarItem" 
                      data-toolbarmenubutton="AddAction"
                      data-method="" 
                      title="${stringEscapeProperty(`||AddAction||`)}"
                      ${this.AddActionModalAttributes}>
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-plus" 
                        width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                        <path d="M12 11l0 6" />
                        <path d="M9 14l6 0" />
                      </svg>
                </span>

                <div class="toolbarDivider"
                     data-toolbarmenubutton="DividerOne"></div>

                <span class="toolbarItem" 
                      data-toolbarmenubutton="ToggleActive"
                      data-method="ToggleActive" 
                      title="${stringEscapeProperty(`||ToggleActive||`)}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circuit-switch-open" 
                        width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="M6 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M18 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M7.5 10.5l7.5 -5.5" />
                      </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circuit-switch-closed d-none" 
                        width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="M6 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M18 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M8 12h8" />
                    </svg>                    
                </span>
                
                <span class="toolbarItem"
                      data-toolbarmenubutton="Rename"
                      ${this.RenameModalAttributes}
                      title="${stringEscapeProperty(`||Rename||`)}">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-forms" 
                        width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3" />
                        <path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3" />
                        <path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7" />
                        <path d="M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1" />
                        <path d="M17 12h.01" />
                        <path d="M13 12h.01" />
                      </svg>
                </span>  

                <span class="toolbarItem"
                      data-toolbarmenubutton="Copy"
                      data-method="Copy"
                      title="${stringEscapeProperty(`||Copy||`)}">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" 
                        width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                      </svg>
                </span>      

                <span class="toolbarItem"
                      data-toolbarmenubutton="Paste"
                      data-method="Paste"
                      title="${stringEscapeProperty(`||Paste||`)}">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clipboard" 
                        width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                        <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                    </svg>
                </span>    

                <span class="toolbarItem"
                      data-toolbarmenubutton="Delete"
                      data-method=""
                      title="${stringEscapeProperty(`||Delete||`)}"
                      ${this.DeleteConfirmModalAttributes}>
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" 
                        width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                </span> 

                <div class="toolbarDivider"
                    data-toolbarmenubutton="DividerTwo"></div>

                <span class="toolbarItem"
                      data-toolbarmenubutton="Import"
                      data-method="Import"
                      title="${stringEscapeProperty(`||ImportAction||`)}">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-import" 
                        width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M5 13v-8a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5.5m-9.5 -2h7m-3 -3l3 3l-3 3" />
                      </svg>
                </span>                 

                <span class="toolbarItem"
                      data-toolbarmenubutton="Export"
                      data-method="Export"
                      title="${stringEscapeProperty(`||ExportAction||`)}">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-export" 
                        width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" />
                      </svg>
                </span>  
                `;    

    }

    UpdateToolbar() {
        
        //let addCategoryButton = $(`#accordion_${window.currentSection.ActionList.Id} .actionListToolbar .toolbarItem[data-toolbarmenubutton='AddCategory']`);
        let addActionButton = $(`#accordion_${window.currentSection.ActionList.Id} .actionListToolbar .toolbarItem[data-toolbarmenubutton='AddAction']`);
        let dividerOne = $(`#accordion_${window.currentSection.ActionList.Id} .actionListToolbar .toolbarDivider[data-toolbarmenubutton='DividerOne']`);
        let toggleActiveButton = $(`#accordion_${window.currentSection.ActionList.Id} .actionListToolbar .toolbarItem[data-toolbarmenubutton='ToggleActive']`);
        let renameButton = $(`#accordion_${window.currentSection.ActionList.Id} .actionListToolbar .toolbarItem[data-toolbarmenubutton='Rename']`);
        let copyButton = $(`#accordion_${window.currentSection.ActionList.Id} .actionListToolbar .toolbarItem[data-toolbarmenubutton='Copy']`);
        let pasteButton = $(`#accordion_${window.currentSection.ActionList.Id} .actionListToolbar .toolbarItem[data-toolbarmenubutton='Paste']`);
        let deleteButton = $(`#accordion_${window.currentSection.ActionList.Id} .actionListToolbar .toolbarItem[data-toolbarmenubutton='Delete']`);
        //let dividerTwo = $(`#accordion_${window.currentSection.ActionList.Id} .actionListToolbar .toolbarDivider[data-toolbarmenubutton='DividerTwo']`);
        //let importButton = $(`#accordion_${window.currentSection.ActionList.Id} .actionListToolbar .toolbarItem[data-toolbarmenubutton='Import']`);
        let exportButton = $(`#accordion_${window.currentSection.ActionList.Id} .actionListToolbar .toolbarItem[data-toolbarmenubutton='Export']`);
        

        let targetName = $(`#accordion_${window.currentSection.ActionList.Id} .actionCategory.card-header.active`).data('name');
        let targetType = null;
        if(targetName) {
            targetType = "Category";
        } else if(window.currentSection.ActionList.CurrentActionItem !== null) {
            targetType = "Action";
            targetName = window.currentSection.ActionList.CurrentActionItem.Action.Description;
        }
        window.currentSection.ActionList.SelectedItemName = targetName;

        if(window.currentSection.ActionList.CurrentActionItem === null) {
            toggleActiveButton.addClass('d-none');
        } else {
            toggleActiveButton.removeClass('d-none');
        }

        if(!window.currentSection.ActionList.SelectedItemName) {
            dividerOne.addClass('d-none');
            addActionButton.addClass('d-none');
            renameButton.addClass('d-none');
            copyButton.addClass('d-none');
            deleteButton.addClass('d-none');
            exportButton.addClass('d-none');
        } else {
            dividerOne.removeClass('d-none');
            addActionButton.removeClass('d-none');
            renameButton.removeClass('d-none');
            copyButton.removeClass('d-none');
            deleteButton.removeClass('d-none');
            exportButton.removeClass('d-none');
        }

        if(copyContents === null) {
            pasteButton.addClass('d-none');
        } else {
            pasteButton.removeClass('d-none');
        }

        log(`UpdateToolbar() - ${targetType}`);
    }
}


/********************************************************************************************
    ActionListItem
*********************************************************************************************/

class ActionListItem {

    //TODO: onfocus, enable key processing, like delete, F2 to rename, etc
    //      onblur, remove key bindings

    constructor(actionList, action) {

        this.Action = action;
        this.ActionList = actionList;
        this.Id = `actionlistitem_${this.ActionList.Application.Description}_${this.Action.Category}_${this.Action.Description}_${Date.now()}`.idname();

    }

    get Canvas() {

        return $(`#canvas_${this.Id}`);

    }

    get HTML() {

        return `<div class="card-body actionlistitem" id="${this.Id}" data-category="${stringEscapeProperty(this.Action.Category)}" data-description="${stringEscapeProperty(this.Action.Description)}">
                    <div class="media">
                        <div class="media-left align-self-center">
                            <canvas id="canvas_${this.Id}" 
                                    class="mt-1" 
                                    title="${stringEscapeProperty(this.Action.Description)}"
                                    width="${this.ActionList.GestureWidth}" 
                                    height="${this.ActionList.GestureHeight}" 
                                    data-gesturename="${stringEscapeProperty(this.Action.GestureName)}" 
                                    data-regions="${this.ActionList.Application.RegionType !== RegionType_None && this.Action.RegionColRows.length > 0 
                                                     ? JSON.stringify(this.Action.RegionColRows).replace(/"/g, "'")
                                                     : ''}" 
                                    data-usesecondary="${this.Action.UseSecondaryStrokeButton}" 
                                    data-active="${this.Action.Active}">
                            </canvas>
                        </div>
                        <div class="media-body align-self-center pl-3">
                            <h6 class="mb-0 ${!this.Action.Active ? "text-muted" : ""}">${stringEscapeHtml(this.Action.Description)}</h6>
                            <small>${this.BuildSmallText()}</small>
                        </div>
                    </div>
                </div>`;

    }    

    BuildSmallText() {

        let smallText = "";
    
        if(colorNetToHex(appSettings.SecondaryPenColor) === colorNetToHex(appSettings.PenColor)) {
            if(this.Action.UseSecondaryStrokeButton) {
                smallText = "<em>||Secondary||</em><br />";    
            } else {
                smallText = "<em>||Primary||</em><br />";    
            }
        }
    
        let modifiers = "";
        if(this.Action.Control) {
            modifiers += "||ControlKey||, ";
        }
        if(this.Action.Alt) {
            modifiers += "||AltKey||, ";
        }
        if(this.Action.Shift) {
            modifiers += "||ShiftKey||, ";
        }
        if(this.Action.WheelUp) {
            modifiers += "||WheelUp||, ";
        }
        if(this.Action.WheelDown) {
            modifiers += "||WheelDown||, ";
        }    
        if(this.Action.Left) {
            modifiers += "||LeftMouse||, ";
        }
        if(this.Action.Middle) {
            modifiers += "||MiddleMouse||, ";
        }
        if(this.Action.Right) {
            modifiers += "||RightMouse||, ";
        }
        if(this.Action.X1) {
            modifiers += "||X1Mouse||, ";
        } 
        if(this.Action.X2) {
            modifiers += "||X2Mouse||, ";
        }                 
        if(modifiers.length > 0) {
            modifiers = modifiers.slice(0,-2);
        }
        smallText += modifiers;                 
        if(modifiers.length > 0 && this.Action.Capture !== ModifierCapture_Either) {
            switch(this.Action.Capture) {
                case ModifierCapture_Before:
                    smallText += " <em>(||ModifierCaptureBefore||)</em>";
                    break;
                case ModifierCapture_After:
                    smallText += " <em>(||ModifierCaptureAfter||)</em>";
                    break;                            
            }
        }  
    
        return smallText;

    }

    CheckForConflict() {

        alertClearFooter('conflictmessage');
        hostPostMessage('ActionExists', '', { "Application" : this.ActionList.Application, "Action" : this.Action, "Target" : this.Id });

    }

    DrawGesture() {

        gestures.DrawToCanvas(appSettings.Gestures.find(g => g.Name == this.Action.GestureName), 
            $(`#canvas_${this.Id}`).prop('id'),
            null,
            colorNetToHex(this.Action.UseSecondaryStrokeButton ? appSettings.SecondaryPenColor : appSettings.PenColor),
            this.Action.RegionColRows
        );        

    }

    OnClick(event) {

        this.ActionList.SelectAction(this, false);

    }

    /*
    OnContextMenu(event) {

        if (!event.altKey && !event.ctrlKey && !event.shiftKey) { 
            event.preventDefault();

            if(skipNextContextMenu) {
                skipNextContextMenu = false;
                return;
            }

            if($('.modal.in, .modal.show').length) {
                return false;
            }

            if($('.custom-menu').css('display') === 'none') {

                if(!$(event.target).closest('actionlistitem').hasClass('active')) {
                    $(event.target).click();
                }

                window.OnContextMenuItemClick = this.OnContextMenuItemClick;

                // Show contextmenu
                $(".custom-menu")
                    .html(`
                            <li ${this.ActionList.AddCategoryModalAttributes}>
                                ||AddCategory||
                            </li>
                            <li ${this.ActionList.AddActionModalAttributes}>
                                ||AddAction||
                            </li>
                            <li class="divider" 
                                data-menudata="ToggleActive">
                                ||ToggleActive||
                            </li>
                            <li data-menudata="Rename">
                                ||Rename||
                            </li>
                            <li data-menudata="Copy">
                                ||Copy||
                            </li>
                            <li data-menudata="Paste">
                                ||Paste||
                            </li>
                            <li ${this.ActionList.DeleteConfirmModalAttributes}>
                                ||Delete||
                            </li>
                            <li class="divider" 
                                data-menudata="Import">
                                ||ImportAction||
                            </li>
                            <li data-menudata="Export">
                                ||ExportAction||
                            </li>
                        `)
                    .finish()
                    .toggle(0)
                    .css({
                        top: event.pageY + "px",
                        left: event.pageX + "px"
                });
            }
        }
    }

    OnContextMenuItemClick(method) {
        if(window.currentSection.ActionList[method]) {
            window.currentSection.ActionList[method]();
        } else {
            log(`method: ${method}`);
        }
    }
    */

    PostRender() {

        this.DrawGesture();   
        document.getElementById(`${this.Id}`).addEventListener("click", (event) => this.OnClick(event));
        //document.getElementById(`${this.Id}`).addEventListener("contextmenu", (event) => this.ActionList.OnContextMenu(event));

    }

    Update(noConflictCheck) {

        $(`#${this.Id}`).closest('.card-body').find('h6').text(this.Action.Description);
        this.Canvas.prop('title', stringEscapeProperty(this.Action.Description));
    
        this.UpdateSmallText();
    
        if($(`#${this.Id}`).data('category') !== this.Action.Category || $(`#${this.Id}`).data('description') !== this.Action.Description){
            let i = 1;
            let description = this.Action.Description;
            while(this.ActionList.ActionItems.find(a => a.Category === this.Action.Category 
                                                                 && a.Description === this.Action.Description
                                                                 && a.Id !== this.Id)) {
                this.Action.Description = description + ' ' + i;
                i++;
            }
    
            $(`#${this.Id}`).data('category', this.Action.Category);
            $(`#${this.Id}`).data('description', this.Action.Description);
            $(`#${this.Id}`).closest('.card-body').find('h6').text(this.Action.Description);
        
            let itemMoved = false;
            let targetCategory = this.ActionList.GetCategory(this.Action.Category);        
            let sourceId = this.Id;
            $(targetCategory).children().each(function(index, item){
                let currentItem = $(item);
                if($(`#${sourceId}`).data('description').localeCompare(currentItem.data('description'), undefined, { sensitivity: 'accent' }) < 0) {
                    $(`#${sourceId}`).insertBefore($(currentItem));
                    itemMoved = true;
                    return false;
                }
            });
            if(!itemMoved) {
                $(targetCategory).append($(`#${this.Id}`));
                itemMoved = true;
            }
            $(targetCategory).collapse('show');
        
            setTimeout(function(element) {
                $(element)[0].scrollIntoView();
                $(element).removeClass('graybgfade');
                $(element).addClass('graybgfade');
            }, 0, `#${this.Id}`);
        }
    
        $(`#canvas_${this.Id}`).data('gesturename', this.Action.GestureName);
        $(`#canvas_${this.Id}`).data('regions', this.ActionList.Application.RegionType !== RegionType_None && this.Action.RegionColRows.length > 0 
                                                ? JSON.stringify(this.Action.RegionColRows).replace(/"/g, "'")
                                                : '');
        $(`#canvas_${this.Id}`).data('usesecondary', this.Action.UseSecondaryStrokeButton);
        $(`#canvas_${this.Id}`).data('active', this.Action.Active);
    
        let openIcon = $(`#${this.ActionList.Id}`).find(`.toolbarItem[data-method='ToggleActive'] svg.icon-tabler-circuit-switch-open`);
        let closedIcon = $(`#${this.ActionList.Id}`).find(`.toolbarItem[data-method='ToggleActive'] svg.icon-tabler-circuit-switch-closed`);

        if(this.Action.Active) {
            closedIcon.addClass('d-none');
            openIcon.removeClass('d-none');
            $(`#${this.Id}`).closest('.card-body').find('h6').removeClass('text-muted');
        } else {
            openIcon.addClass('d-none');
            closedIcon.removeClass('d-none');
            $(`#${this.Id}`).closest('.card-body').find('h6').addClass('text-muted');
        }   
    
        if(noConflictCheck) {
            $(`#${this.Id}`).closest('.card-body').find('h6').removeClass('text-danger');
        } else {
            this.CheckForConflict();
        }
    
        this.DrawGesture();      
    
        this.ActionList.CheckActionConflicts(true);

    }

    UpdateSmallText() {

        $(`#${this.Id}`).closest('.card-body').find('small').html(this.BuildSmallText());

    }  
}
