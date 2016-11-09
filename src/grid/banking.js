var init = function() {
	bind.dataTables({
		tableId : "#bankingStatus",
		url : __context + '/banking/list'
	});
};

$(document).ready(function() {
	init();
});

var editor;
var table;
var bind = (function() {
	return {
		dataTables : function(option) {
			editor = new $.fn.dataTable.Editor({
				'ajax' : option.url,
				'table' : option.tableId,
				'fields' : [ {
					label : '용도:',
					name : 'usage'
				}, {
					label : '금융권/운용주체:',
					name : 'operators'
				}, {
					label : '금융기관명:',
					name : 'bankName'
				}, {
					label : '상품유형:',
					name : 'productType',
				}, {
					label : '상품명:',
					name : 'productName'
				}, {
					label : '가입일:',
					name : 'joinDate',
					type : 'datetime'
				}, {
					label : '만기일:',
					name : 'dueDate',
					type : 'datetime'
				}, {
					label : '통화:',
					name : 'currency'
				}, {
					label : '금리:',
					name : 'interestRate'
				}, {
					label : '현지통화금액 :',
					name : 'localCurrencyAmount'
				}, {
					label : '환율:',
					name : 'exchangeRate'
				}, {
					label : '원화환산금액:',
					name : 'wonConversionAmount'
				} ]
			});

			// Add search input box
			$(option.tableId + ' tfoot th').each(function(index) {
				if (index != 0) {
					var title = $(this).text();
					$(this).html('<input type="text" placeholder="" />');
				}
			});

			table = $(option.tableId).DataTable({
				serverSide : true, 
				processing : true,
				ajaxDataProp: '',
				ajax : {
					url : option.url,
					type : 'POST'
				},
				dom : 'Bfrtip',
				oLanguage : {
					'sInfo' : '총 _TOTAL_ 건',
					'sInfoEmpty' : '총 0 건'
				},
				order : [ [ 1, 'asc' ] ],
				//pageLength: 15,
				columns : [
						{
							data : 'DT_RowId',//null,
							render : function(data, type, row) {
								if (type === 'display') {
									return '<input type="checkbox" class="editor-active" value="'+data+'">';
								}
								return data;
							},
							className : 'dt-body-center',
							orderable : false
						},
						{
							data : 'usage'
						},
						{
							data : 'operators'
						},
						{
							data : 'bankName'
						},
						{
							data : 'productType'
						},
						{
							data : 'productName'
						},
						{
							data : 'joinDate',
							sClass : 'text-center'
						},
						{
							data : 'dueDate',
							sClass : 'text-center'
						},
						{
							data : 'currency',
							sClass : 'text-center'
						},
						{
							data : 'interestRate',
							sClass : 'text-right'
						},
						{
							data : 'localCurrencyAmount',
							render : $.fn.dataTable.render.number(',', '.', 0, ''),
							sClass : 'text-right'
						},
						{
							data : 'exchangeRate',
							sClass : 'text-right'
						},
						{
							data : 'wonConversionAmount',
							render : $.fn.dataTable.render.number(',', '.', 0, ''),
							sClass : 'text-right'
						} ],
				buttons : [ {
						extend : 'create', editor : editor
					},
					// { extend: "edit", editor: editor },
					// { extend: "remove", editor: editor },
					{
						text : 'delete',
						action : function(e, dt, node, config) {
							bind.delete_();
						}
					},
					'copy',
					'excel'
				],
				// set the checked state of the  checkbox in the table
				rowCallback : function(row, data) {
					$('input.editor-active', row).prop('checked', false);
				},
				select : false
			});

			// Activate an inline edit on click of a table cell
			table.on( 'click keyup change', 'tbody td:not(:first-child)', function(e) {
				var thisValue = '';
				if (e.type == 'click') {
					editor.inline(this, {
						onBlur : console.log(thisValue = $(this).html())
					});
				}

				if (e.type == 'keyup') {
					var rowid = $(this).closest('tr').attr('id');
					var column = $(this).find('[id^=DTE_Field]').attr('id');
					var changeValue = $('#' + column).val();
					column = column.replace('DTE_Field_', '');
					alert('id: ' + rowid + ' / column: ' + column + ' / changeValue: ' + changeValue);
					if (changeValue !== thisValue) {
						console.log(changeValue);
					}
				}
				// $(this).closest('tr').children('td:first').find('input.editor-active').prop('checked','checked');
			});

			// Checkbox click event
			table.on( 'change', 'input.editor-active', function() {
				editor.edit($(this).closest('tr'), false).set('active', $(this).prop('checked') ? 1 : 0);
			});

			// Apply the search
			table.columns().every(function() {
				var that = this;
				$('input', this.footer()).on('keyup change', function() {
					if (that.search() !== this.value) {
						that.search(this.value).draw();
					}
				});
			});
		},
		add : function() {

		},
		delete_ : function() {
			var ids = bind.getIds();
			if (ids == '') {
				alert('선택된 데이터가 없습니다.');
			} else {
				if (confirm('정말 삭제하겠습니까?')) {
					alert(ids);
				}
			}
		},
		getIds : function() {
			var ids = [];
			$(option.tableId + ' tbody tr').each(function(index) {
				if ($(this).children('td').find('input.editor-active').prop('checked') == true) {
					ids.push($(this).attr('id'));
				}
			});
			return ids;
		}
	}
}());