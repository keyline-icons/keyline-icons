import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mails({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M23 13.1774L23 17C23 19.2092 21.2092 21 19 21L9 21C6.7908 21 5 19.2092 5 17L5 13.1774C5 12.6251 5.4477 12.1774 6 12.1774C6.1348 12.1774 6.2682 12.2047 6.3922 12.2576L13.2092 15.1918C13.459 15.2993 13.7281 15.3547 14 15.3547C14.2719 15.3547 14.5409 15.2993 14.7906 15.1919L21.6077 12.2576C21.7318 12.2047 21.8652 12.1774 22 12.1774C22.5523 12.1774 23 12.6251 23 13.1774ZM5.527 9.0141C6.2393 7.7681 7.5647 6.9994 9 7L19 7C20.4353 6.9994 21.7607 7.7681 22.473 9.0141C22.4734 9.0257 22.4736 9.0373 22.4736 9.0489C22.4736 9.4462 22.2385 9.8059 21.8745 9.9653L14.0002 13.3547L6.122 9.9638C5.7599 9.8035 5.5264 9.4448 5.5264 9.0488C5.5264 9.0373 5.5266 9.0257 5.527 9.0141Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 13L2 7C2 5.3431 3.3431 4 5 4L15 4" fill="none"/>
    </svg>
  )
}
