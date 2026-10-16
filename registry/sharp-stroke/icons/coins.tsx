import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Coins({ size = 24, ...props }: IconProps) {
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
      <path d="M22 11.5C22 12.8807 19.7614 14 17 14C14.2386 14 12 12.8807 12 11.5C12 10.1193 14.2386 9 17 9C19.7614 9 22 10.1193 22 11.5ZM12 11.5L12 19.5C12 20.8807 14.2386 22 17 22C19.7614 22 22 20.8807 22 19.5L22 11.5M12 15.5C12 16.8807 14.2386 18 17 18C19.7614 18 22 16.8807 22 15.5M12 4.5C12 5.8807 9.7614 7 7 7C4.2386 7 2 5.8807 2 4.5C2 3.1193 4.2386 2 7 2C9.7614 2 12 3.1193 12 4.5ZM2 4.5L2 12.5C2 13.2504 2.6742 13.9612 3.8365 14.436C4.9987 14.9108 6.5261 15.0994 7.9968 14.9498L8.8956 14.8584M2 8.5C2 9.2523 2.6776 9.9647 3.8449 10.4394C5.0122 10.9142 6.545 11.1008 8.0182 10.9476L8.9148 10.8544" fill="none"/>
    </svg>
  )
}
