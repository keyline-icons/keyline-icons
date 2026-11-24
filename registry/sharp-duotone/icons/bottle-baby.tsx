import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BottleBaby({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 7L14.5 7C15.0523 7 15.5 6.5523 15.5 6C15.5 5.5116 15.4179 5.0998 15.2382 4.7403C15.0632 4.3902 14.8266 4.1624 14.7071 4.0429C14.5766 3.9124 14.5632 3.8902 14.5507 3.8653C14.5429 3.8498 14.5 3.7616 14.5 3.5C14.5 2.1193 13.3807 1 12 1C10.6193 1 9.5 2.1193 9.5 3.5C9.5 3.7616 9.4571 3.8498 9.4493 3.8653C9.4368 3.8902 9.4234 3.9124 9.2929 4.0429C9.1734 4.1624 8.9368 4.3902 8.7618 4.7403C8.5821 5.0998 8.5 5.5116 8.5 6C8.5 6.5523 8.9477 7 9.5 7ZM6 17L6 22C6 22.5523 6.4477 23 7 23L17 23C17.5523 23 18 22.5523 18 22L18 18L18 14L18 12.0002C18 11.845 17.9639 11.6919 17.8944 11.553L16.8944 9.5528C16.7251 9.214 16.3788 9 16 9L8 9C7.6212 9 7.275 9.214 7.1056 9.5528L6.1056 11.5528C6.0361 11.6916 6 11.8448 6 12Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 11L16 11C16.5523 11 17 10.5523 17 10L17 6C17 5.4477 16.5523 5 16 5L14.5 5L9.5 5L8 5C7.4477 5 7 5.4477 7 6L7 10C7 10.5523 7.4477 11 8 11ZM18 19L17 19L14 19L13 19L13 17L14 17L17 17L18 17L18 18ZM18 15L17 15L14 15L13 15L13 13L14 13L17 13L18 13L18 14Z" fill="currentColor"/>
    </svg>
  )
}
