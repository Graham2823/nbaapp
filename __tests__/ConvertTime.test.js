import convertTo12HourFormat from '@/utils/convertTime'; // Adjust the import path as needed

describe('convertTo12HourFormat', () => {
	it('should format datetime with date and time', () => {
		const isoDatetime = '2024-10-01T14:30:00Z'; // 2:30 PM UTC
		const result = convertTo12HourFormat(isoDatetime, true);
		expect(result).toBe('10-1-2024 10:30 AM ET'); 
	});

	it('should format datetime with only time', () => {
		const isoDatetime = '2024-10-01T06:30:00Z'; // 2:30 AM UTC
		const result = convertTo12HourFormat(isoDatetime, false);
		expect(result).toBe('2:30 AM ET'); 
	});

	it('should handle midnight correctly', () => {
		const isoDatetime = '2024-10-01T04:00:00Z'; // Midnight UTC
		const result = convertTo12HourFormat(isoDatetime, true);
		expect(result).toBe('10-1-2024 12:00 AM ET'); 
	});

	it('should handle noon correctly', () => {
		const isoDatetime = '2024-10-01T16:00:00Z'; // Noon UTC
		const result = convertTo12HourFormat(isoDatetime, true);
		expect(result).toBe('10-1-2024 12:00 PM ET'); 
	});
});
