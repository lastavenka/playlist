(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1396:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(17),s=n.n(i),o=(n(204),n(18)),l=n(19),c=n(21),u=n(20),h=n(22),f=n(116),m=(n(206),n(15)),v=(n(208),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"defineClass",value:function(){var e="sort-controls";return this.props.active&&(e+=this.props.reverse?" sort-controls_direction_up":" sort-controls_direction_down"),e}},{key:"render",value:function(){var e=this;return r.a.createElement("button",{className:this.defineClass(),onClick:function(){return e.props.handleClick(e.props.sortBy)}})}}]),t}(a.PureComponent)),d=[{label:"\u0418\u0441\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c",id:"band"},{label:"\u041f\u0435\u0441\u043d\u044f",id:"song"},{label:"\u0416\u0430\u043d\u0440",id:"genre"},{label:"\u0413\u043e\u0434",id:"year"}],p=[{label:"\u0418\u0441\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c",id:"band"},{label:"\u0416\u0430\u043d\u0440",id:"genre"},{label:"\u0413\u043e\u0434",id:"year"}],g=[10,25,50,100],y=10,b="band",k=n(23),_=n.n(k),E=(n(210),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"getHeaders",value:function(){var e=this;return d.map(function(t){return r.a.createElement(m.f,{align:"left",key:_()()},r.a.createElement("div",{className:"playlist-table__header"},t.label,r.a.createElement(v,{sortBy:t.id,active:e.props.sortBy===t.id,reverse:e.props.reverse,handleClick:function(t){return e.props.handleClick(t)}})))})}},{key:"getRows",value:function(){var e=this;return this.props.data.map(function(t){return r.a.createElement(m.h,{key:_()(),hover:!0},e.getCells(t))})}},{key:"getCells",value:function(e){return Object.values(e).map(function(e){return r.a.createElement(m.f,{key:_()(),align:"left"},e)})}},{key:"render",value:function(){return r.a.createElement(m.d,{className:"playlist-table"},r.a.createElement(m.g,null,r.a.createElement(m.h,null,this.getHeaders())),r.a.createElement(m.e,null,this.getRows()))}}]),t}(a.Component)),C=(n(341),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"getFilters",value:function(){var e=this;if(this.props.filters&&this.props.filters.length)return this.props.filters.map(function(t){return r.a.createElement(m.a,{key:_()()},t.label,r.a.createElement(m.c,{className:"filters__select",onChange:function(n){return e.props.onChange(t.id,n.target.value)},value:e.getValue(t.id),key:_()()},e.getItems(t.items,t.id)))})}},{key:"getItems",value:function(e){return e.map(function(e){return r.a.createElement(m.b,{value:e,key:_()()},e)})}},{key:"getValue",value:function(e){var t=this.props.activeFilters;if(t&&t.length){var n=t.find(function(t){return t.id===e});if(n)return n.value}return"\u0432\u0441\u0435"}},{key:"render",value:function(){return r.a.createElement("div",{className:"filters"},r.a.createElement("h2",{className:"filters__title"},"\u0424\u0438\u043b\u044c\u0442\u0440"),r.a.createElement("form",null,this.getFilters()))}}]),t}(a.PureComponent)),w=(n(343),function(e){return r.a.createElement("ul",{className:"controls-set"},e.items.map(function(t){return r.a.createElement("li",{className:e.active===t?"controls-set__item controls-set__item_state_active":"controls-set__item",key:_()()},r.a.createElement("button",{onClick:function(){return e.handleClick(t)}},t))}))}),O=(n(345),function(e){return r.a.createElement("span",{className:"spinner"},e.text)}),j=n(44),N=n.n(j),D=function(e,t){return e+Math.floor(Math.random()*(t-e))},S=function(e){return e[D(0,e.length-1)]},P=function(){for(var e=[],t=[],n=[],a=1;a<50;a++)e.push(N.a.random.word());for(var r=0;r<10;r++)t.push(N.a.random.word());for(var i=0;i<500;i++)n[i]={band:S(e),song:N.a.random.words(),genre:S(t),year:D(1986,2019)};return new Promise(function(e){return setTimeout(function(){return e({status:200,data:JSON.stringify(n)})},1500)})},F=n(115),B=n.n(F),x=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={data:[],error:!1,loading:!0,rows:y,currentPage:1,sortBy:b,reverse:!1,activeFilters:[]},n.generateData=P,n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getPlaylistData()}},{key:"getPlaylistData",value:function(){var e=this;this.generateData().then(function(t){return e.handleResponse(t)}).catch(function(t){return e.setError("\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435")})}},{key:"handleResponse",value:function(e){200===e.status?this.setState({data:JSON.parse(e.data),loading:!1}):(this.setState({loading:!1}),this.setError("\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435"))}},{key:"setError",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.setState({error:e})}},{key:"showError",value:function(){var e=this.state.error;if(e)return r.a.createElement("span",{className:"playlist__error"},e)}},{key:"showSpinner",value:function(){if(this.state.loading)return r.a.createElement(O,{text:"\u0418\u0434\u0435\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."})}},{key:"decorateTableData",value:function(e){var t=this.sortData(e);return this.sliceData(t)}},{key:"getFilters",value:function(){var e=[],t=[];return p.forEach(function(n){e.push({id:n.id,label:n.label,items:[]}),t.push(n.id)}),this.state.data.forEach(function(n){var a=function(a){if(!t.includes(a))return"continue";e.find(function(e){return e.id===a}).items.push(n[a])};for(var r in n)a(r)}),e.forEach(function(e){var t=new Set(e.items);e.items=Object(f.a)(t),"year"===e.id?e.items.sort():e.items.sort(function(e,t){return e.localeCompare(t)}),e.items.unshift("\u0432\u0441\u0435")}),e}},{key:"filterData",value:function(){var e=this.state,t=e.data,n=e.activeFilters;return n.length?n.reduce(function(e,t){return e.filter(function(e){return e[t.id]===t.value})},t):t}},{key:"sortData",value:function(e){var t=this.state,n=t.sortBy,a=t.reverse;return"year"===n?e.sort(function(e,t){return a?e.year-t.year:t.year-e.year}):e.sort(function(e,t){return a?t[n].localeCompare(e[n]):e[n].localeCompare(t[n])})}},{key:"sliceData",value:function(e){var t=this.state,n=t.rows,a=t.currentPage;return e.slice(n*(a-1),n*a)}},{key:"showContent",value:function(){var e=this,t=this.state,n=t.data,i=t.activeFilters;if(n.length){var s=this.filterData(),o=this.getFilters();return r.a.createElement(a.Fragment,null,r.a.createElement("div",{className:"playlist__inner"},r.a.createElement("h2",{className:"playlist__title"},"\u041f\u043b\u0435\u0439\u043b\u0438\u0441\u0442"),this.showTable(s)),r.a.createElement(C,{filters:o,activeFilters:i,onChange:function(t,n){return e.changeFilter(t,n)}}))}}},{key:"showTable",value:function(e){var t=this;if(!e.length)return r.a.createElement("span",null,"\u041d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445 \u0434\u043b\u044f \u043e\u0442\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u0444\u0438\u043b\u044c\u0442\u0440 \u043f\u043e\u0438\u0441\u043a\u0430.");var n=this.state,i=n.rows,s=n.currentPage,o=this.decorateTableData(e);return r.a.createElement(a.Fragment,null,r.a.createElement(E,{data:o,sortBy:this.state.sortBy,reverse:this.state.reverse,handleClick:function(e){return t.changeSorting(e)}}),r.a.createElement("div",{className:"playlist__controls"},r.a.createElement(B.a,{pageCount:e.length/i,pageRangeDisplayed:2,marginPagesDisplayed:1,forcePage:s-1,onPageChange:function(e){return t.changePage(e)},previousLabel:"<",nextLabel:">",containerClassName:"pagination-controls",pageClassName:"pagination-controls__item",activeClassName:"pagination-controls__item_state_active",nextClassName:"pagination-controls__btn pagination-controls__btn_direction_next",previousClassName:"pagination-controls__btn pagination-controls__btn_direction_prev",disabledClassName:"pagination-controls__btn_state_disabled",breakClassName:"pagination-controls__break"}),r.a.createElement(w,{items:g,active:i,handleClick:function(e){return t.changeRowsCount(e)}})))}},{key:"changeSorting",value:function(e){if(this.state.sortBy===e)return this.toggleSortDirection();this.setState({sortBy:e,reverse:!1})}},{key:"changePage",value:function(e){var t=e.selected;this.setState({currentPage:t+1})}},{key:"changeRowsCount",value:function(e){e!==this.state.rows&&this.setState({rows:e,currentPage:1})}},{key:"toggleSortDirection",value:function(){this.setState({reverse:!this.state.reverse})}},{key:"changeFilter",value:function(e,t){var n=this.state.activeFilters,a=n.find(function(t){return t.id===e});if(a){var r=n.indexOf(a);"\u0432\u0441\u0435"===t?n.splice(r,1):n[r].value=t}else n.push({id:e,value:t});this.setState({activeFilters:n,currentPage:1})}},{key:"render",value:function(){return r.a.createElement("section",{className:"playlist"},this.showError(),this.showSpinner(),this.showContent())}}]),t}(a.Component),R=function(){return r.a.createElement("main",{className:"home-page"},r.a.createElement(x,null))},T=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(R,null)}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},199:function(e,t,n){e.exports=n(1396)},204:function(e,t,n){},206:function(e,t,n){},208:function(e,t,n){},210:function(e,t,n){},341:function(e,t,n){},343:function(e,t,n){},345:function(e,t,n){}},[[199,2,1]]]);
//# sourceMappingURL=main.1a919d41.chunk.js.map