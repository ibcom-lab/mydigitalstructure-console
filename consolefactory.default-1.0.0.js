/*
	Console factory

	# "automate-update-supplier-status-based-on-certificate-status"
*/

var mydigitalstructure = require('mydigitalstructure')
var _ = require('lodash')

module.exports = 
{
	VERSION: '0.0.1',

	init: function (param)
	{
		mydigitalstructure.add(
		{
			name: 'console-objects',
			code: function (param, response)
			{
				var event = mydigitalstructure.get({scope: '_event'});

				if (response == undefined)
				{
					var filters = [];

					if (event.objectname != undefined)
					{
						filters.push(
						{
							field: 'title',
							comparison: 'TEXT_IS_LIKE',
							value: event.objectname
						});
					}
					
					mydigitalstructure.cloud.search(
					{
						object: 'core_object',
						fields:
						[
							{name: 'title'},
							{name: 'BulkAvailable'},
							{name: 'category'},
							{name: 'categorytext'},
							{name: 'notes'},
							{name: 'parentobject'},
							{name: 'parentobjecttext'},
							{name: 'prefix'},
							{name: 'RemoveRequestingAvailable'},
							{name: 'RoleObjectAccessAvailable'},
							{name: 'SnapshotAvailable'},
							{name: 'object.method.title'},
							{name: 'object.method.endpointtext'},
							{name: 'object.method.object'},
							{name: 'object.method.objecttext'},
						],
						filters: filters,
						rows: 99999,
						callback: 'console-objects',
						callbackParam: param
					});
				}
				else
				{
					var objects = mydigitalstructure.set(
					{
						scope: 'console',
						context: 'object',
						value: response.data.rows
					});

					mydigitalstructure.invoke('util-end', objects)
				}
			}
		});		
	}
}