import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ScanBox({ size = 24, ...props }: IconProps) {
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
      <path d="M3 8V6C3 4.343 4.3432 3 6 3H8M16 3H18C19.6569 3 21 4.343 21 6V8M21 16V18C21 19.657 19.6569 21 18 21H16M8 21H6C4.3432 21 3 19.657 3 18V16" strokeOpacity="0.4"/>
      <path d="M14.9076 16.764L12.9076 17.782C12.3374 18.073 11.6627 18.073 11.0925 17.782L7.0925 15.745C6.4223 15.404 6 14.716 6 13.963V10.037C6 9.284 6.4222 8.596 7.0925 8.255L11.0925 6.218C11.6627 5.927 12.3374 5.927 12.9076 6.218L16.9076 8.255C17.578 8.596 18 9.285 18 10.037V13.963C18 14.715 17.578 15.404 16.9076 15.745L14.9076 16.764Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 10.034C6.001 9.283 6.423 8.595 7.0925 8.255L11.0925 6.218C11.6627 5.927 12.3374 5.927 12.9076 6.218L16.9076 8.255C17.5772 8.596 17.999 9.283 18 10.034L12.4579 12.889C12.3163 12.962 12.1593 13 12 13C11.8407 13 11.6837 12.962 11.5421 12.889L6 10.034Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
