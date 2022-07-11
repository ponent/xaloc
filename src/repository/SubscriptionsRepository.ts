import { openDB, IDBPDatabase, DBSchema } from 'idb';
import { IPodcastResult } from '../store/search/reducer';

const XalocDatabase = "XALOCAPP"
const SubscriptionsObjectStore = "SUBSCRIPTIONS"

interface MyDBV1 extends DBSchema {
    [SubscriptionsObjectStore]: {
        key: string;
        value: PodcastDTO
    };
}

const db = openDB<MyDBV1>(XalocDatabase, 1, {
    async upgrade(db, oldVersion) {
        // Cast a reference of the database to the old schema.
        const v1Db = db as unknown as IDBPDatabase<MyDBV1>;
        v1Db.createObjectStore(SubscriptionsObjectStore, {
            keyPath: 'id',
        });
    },
});

type PodcastDTO = {
    id: string;
    podcast: IPodcastResult;
}

const BuildPodcastDTOId = (podcast: IPodcastResult): string => `${podcast.platform}_${podcast.trackId}`

const Create = (podcast: IPodcastResult): PodcastDTO => {
    return {
        id: BuildPodcastDTOId(podcast),
        podcast: podcast
    }
}

export const AddSubscription = async (podcast: IPodcastResult) => {
    const database = await db
    await database.add(SubscriptionsObjectStore, Create(podcast))
}

export const RestoreBackup = async (podcasts: IPodcastResult[]) => {
    await EmptySubscriptions()
    podcasts.forEach(AddSubscription)
}

export const RemoveSubscription = async (podcast: IPodcastResult) => {
    const database = await db
    await database.delete(SubscriptionsObjectStore, BuildPodcastDTOId(podcast))
}

export const GetSubscriptions = async (): Promise<IPodcastResult[]> => {
    const database = await db
    const subscriptions = (await database.getAll(SubscriptionsObjectStore))
    return subscriptions.map((dto: PodcastDTO): IPodcastResult => dto.podcast)
}

export const EmptySubscriptions = async () => {
    const database = await db
    database.clear(SubscriptionsObjectStore)
    //deleteDB(XalocDatabase)
}

const downloadFile = (data: any, fileName: string, fileType: any) => {
    const blob = new Blob([data], { type: fileType })

    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
}

export const exportToJson = async () => {
    const subscriptions = await GetSubscriptions()
    downloadFile(
        JSON.stringify(subscriptions),
        'subscriptions.json',
        'text/json',
    )
}
