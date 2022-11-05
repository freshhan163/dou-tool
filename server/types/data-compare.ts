export interface Res {
    msg: string;
    st: number;
}

export interface CompareNumberItem {
    today: number;
    yesterday: number;
}

export interface CompareItem {
    // 时间：00:00，01:00
    x: string;
    // 实际数据
    y: CompareNumberItem;
}

export interface DataCompareRes extends Res {
    data: {
        data: {
            begin_date: number; // 00:00
            end_date: number; // 23:00
            focused_begin_date: number;
            focused_end_date: number;
            data_result: {
                display: CompareNumberItem; // 今日 | 昨日
                unit: CompareNumberItem;
                value: CompareItem[]; // 实际数据
            };
        }
    }
}

// 接口请求参数
export interface DataCompareParams {
    begin_date?: string; // 当天的 00:00，2022/11/05 00:00:00
    end_date?: string; // 当天的 00:00，比如 2022/11/05 00:00:00
    product_id?: number;
    index_selected: string; // pay_ucnt | product_click_ucnt | product_show_ucnt
    msToken?: string;
    'X-Bogus'?: string;
}

export interface NewListItem {
    time: string;
    increment: number; // 今天该小时内的增量
    yesterday: number; // 昨天该小时内的增量
}