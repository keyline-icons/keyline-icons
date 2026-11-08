import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Wine({ size = 24, ...props }: IconProps) {
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
      <path d="M12 16H14.4144C15.4065 16 16.3719 15.67 17.1655 15.07C18.7811 13.84 19.4137 11.68 18.7236 9.76L16.4146 3.32C16.1313 2.53 15.391 2 14.5619 2H9.438C8.6091 2 7.8686 2.53 7.5854 3.32L5.2764 9.76C4.5863 11.68 5.219 13.84 6.8345 15.07C7.6282 15.67 8.5935 16 9.5857 16H12ZM12 16V22M12 22H9.0429M12 22H14.9571M6.0858 9C6.8627 9 7.6187 8.87 8.24 8.64C8.8614 8.4 9.6174 8.28 10.3942 8.28C11.171 8.28 11.9271 8.4 12.5485 8.64C13.1699 8.87 13.926 9 14.7028 9C16.0626 9 17.306 8.61 17.9142 8"/>
    </svg>
  )
}
