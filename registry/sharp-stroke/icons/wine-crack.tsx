import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WineCrack({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 16L12 22M12.5 2L11.25 5.5L13.5 7.5L11.5 11L11.2121 11.5039M12.5 2L15.9413 2L18.7236 9.76C19.4137 11.68 18.7811 13.84 17.1655 15.07C16.3719 15.67 15.4065 16 14.4144 16L12 16L9.5857 16C8.5935 16 7.6282 15.67 6.8345 15.07C5.219 13.84 4.5863 11.68 5.2764 9.76L8.0587 2ZM8.0429 22L9.0429 22L12 22L14.9571 22L15.9571 22" fill="none"/>
    </svg>
  )
}
