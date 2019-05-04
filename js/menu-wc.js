'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">EPMQMDocs</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#additional-pages"'
                            : 'data-target="#xs-additional-pages"' }>
                            <span class="icon ion-ios-book"></span>
                            <span>UserDocumentation</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                                    <li class="link ">
                                        <a href="additional-documentation/introduction.html" data-type="entity-link" data-context-id="additional">Introduction</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/manual-queue-dispatcher.html" data-type="entity-link" data-context-id="additional">Manual Queue Dispatcher</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/manage-team.html" data-type="entity-link" data-context-id="additional">Manage Team</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/rcc.html" data-type="entity-link" data-context-id="additional">RCC</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/settings.html" data-type="entity-link" data-context-id="additional">Settings</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/hana-cloud-cockpit.html" data-type="entity-link" data-context-id="additional">Hana Cloud Cockpit</a>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-4bf294b1fccc11a0d06e5e4eb5d04109"' : 'data-target="#xs-components-links-module-AppModule-4bf294b1fccc11a0d06e5e4eb5d04109"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-4bf294b1fccc11a0d06e5e4eb5d04109"' :
                                            'id="xs-components-links-module-AppModule-4bf294b1fccc11a0d06e5e4eb5d04109"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActivityLogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActivityLogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoticeBoardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoticeBoardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PatchNotesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PatchNotesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-cfb1fa8f57777befcbfc065b2d4d1107"' : 'data-target="#xs-injectables-links-module-CoreModule-cfb1fa8f57777befcbfc065b2d4d1107"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-cfb1fa8f57777befcbfc065b2d4d1107"' :
                                        'id="xs-injectables-links-module-CoreModule-cfb1fa8f57777befcbfc065b2d4d1107"' }>
                                        <li class="link">
                                            <a href="injectables/ArchiveService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ArchiveService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LogService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LogService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoginService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LoginService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProductService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/QueueDashboardModule.html" data-type="entity-link">QueueDashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-QueueDashboardModule-925f4ce32dc2765ed89f73851ba7f9d7"' : 'data-target="#xs-components-links-module-QueueDashboardModule-925f4ce32dc2765ed89f73851ba7f9d7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-QueueDashboardModule-925f4ce32dc2765ed89f73851ba7f9d7"' :
                                            'id="xs-components-links-module-QueueDashboardModule-925f4ce32dc2765ed89f73851ba7f9d7"' }>
                                            <li class="link">
                                                <a href="components/ClipboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClipboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ComponentBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ComponentBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QmInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QmInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QueueControlComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QueueControlComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QueueDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QueueDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShiftInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShiftInfoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-QueueDashboardModule-925f4ce32dc2765ed89f73851ba7f9d7"' : 'data-target="#xs-pipes-links-module-QueueDashboardModule-925f4ce32dc2765ed89f73851ba7f9d7"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-QueueDashboardModule-925f4ce32dc2765ed89f73851ba7f9d7"' :
                                            'id="xs-pipes-links-module-QueueDashboardModule-925f4ce32dc2765ed89f73851ba7f9d7"' }>
                                            <li class="link">
                                                <a href="pipes/FilterPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/IsAvailable.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IsAvailable</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SortByAVGQDay.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SortByAVGQDay</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SortByAlpha.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SortByAlpha</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SortByPriority.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SortByPriority</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/QueueDashboardRoutingModule.html" data-type="entity-link">QueueDashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RccDashboardModule.html" data-type="entity-link">RccDashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RccDashboardModule-001135bdd12aca04dab8792346ce681f"' : 'data-target="#xs-components-links-module-RccDashboardModule-001135bdd12aca04dab8792346ce681f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RccDashboardModule-001135bdd12aca04dab8792346ce681f"' :
                                            'id="xs-components-links-module-RccDashboardModule-001135bdd12aca04dab8792346ce681f"' }>
                                            <li class="link">
                                                <a href="components/RccDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RccDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RccManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RccManagementComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsModule.html" data-type="entity-link">SettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SettingsModule-eea0f7e6612d121ceeafab852c1ef671"' : 'data-target="#xs-components-links-module-SettingsModule-eea0f7e6612d121ceeafab852c1ef671"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsModule-eea0f7e6612d121ceeafab852c1ef671"' :
                                            'id="xs-components-links-module-SettingsModule-eea0f7e6612d121ceeafab852c1ef671"' }>
                                            <li class="link">
                                                <a href="components/ApplicationSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ApplicationSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ComponentSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ComponentSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoticeBoardSettingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoticeBoardSettingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-317e2ade8885e39e9f2beda27e133d83"' : 'data-target="#xs-components-links-module-SharedModule-317e2ade8885e39e9f2beda27e133d83"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-317e2ade8885e39e9f2beda27e133d83"' :
                                            'id="xs-components-links-module-SharedModule-317e2ade8885e39e9f2beda27e133d83"' }>
                                            <li class="link">
                                                <a href="components/LoadingSpinnerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoadingSpinnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalConfirmComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalConfirmComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalServerErrorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalServerErrorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeamDashboardModule.html" data-type="entity-link">TeamDashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TeamDashboardModule-2e94cbed159ba9fb870ee728b6b6400e"' : 'data-target="#xs-components-links-module-TeamDashboardModule-2e94cbed159ba9fb870ee728b6b6400e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TeamDashboardModule-2e94cbed159ba9fb870ee728b6b6400e"' :
                                            'id="xs-components-links-module-TeamDashboardModule-2e94cbed159ba9fb870ee728b6b6400e"' }>
                                            <li class="link">
                                                <a href="components/AddUserFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddUserFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeamDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeamManagerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamManagerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ActionEntryLog.html" data-type="entity-link">ActionEntryLog</a>
                            </li>
                            <li class="link">
                                <a href="classes/BodyParser.html" data-type="entity-link">BodyParser</a>
                            </li>
                            <li class="link">
                                <a href="classes/Detail.html" data-type="entity-link">Detail</a>
                            </li>
                            <li class="link">
                                <a href="classes/Helper.html" data-type="entity-link">Helper</a>
                            </li>
                            <li class="link">
                                <a href="classes/Notification.html" data-type="entity-link">Notification</a>
                            </li>
                            <li class="link">
                                <a href="classes/QmUser.html" data-type="entity-link">QmUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkShift.html" data-type="entity-link">WorkShift</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ArchiveService.html" data-type="entity-link">ArchiveService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link">LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogService.html" data-type="entity-link">LogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link">NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link">ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QueueStateService.html" data-type="entity-link">QueueStateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WebSocketAbstractService.html" data-type="entity-link">WebSocketAbstractService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ModalInterface.html" data-type="entity-link">ModalInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise-inverted.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});