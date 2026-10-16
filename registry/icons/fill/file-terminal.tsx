import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileTerminal({ size = 24, ...props }: IconProps) {
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
      <path d="M14 1C14.2652 1 14.5195 1.1054 14.707 1.293L20.707 7.293C20.8946 7.4805 21 7.7348 21 8L21 18C21 20.7614 18.7614 23 16 23L8 23C5.2386 23 3 20.7614 3 18L3 6C3 3.2386 5.2386 1 8 1L14 1ZM14 5C14 6.6569 15.3431 8 17 8L18.5858 8L14 3.4142L14 5ZM8.6508 10.2407C8.4695 10.0854 8.2387 10 8 10C7.4477 10 7 10.4477 7 11C7 11.2919 7.1276 11.5693 7.3492 11.7593L9.9634 14L7.3492 16.2407C7.1276 16.4307 7 16.7081 7 17C7 17.5523 7.4477 18 8 18C8.2387 18 8.4695 17.9146 8.6508 17.7593L11.7079 15.1389C12.0404 14.8539 12.2317 14.4379 12.2317 14C12.2317 13.5621 12.0404 13.1461 11.7079 12.8611L8.6508 10.2407ZM13 17C12.4477 17 12 17.4477 12 18C12 18.5523 12.4477 19 13 19L16 19C16.5523 19 17 18.5523 17 18C17 17.4477 16.5523 17 16 17L13 17Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
