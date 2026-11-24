import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Club({ size = 24, ...props }: IconProps) {
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
      <path d="M12 22L7.5 22C6.9477 22 6.5 21.5523 6.5 21C6.5 20.7348 6.6054 20.4804 6.7929 20.2929L8.7236 18.3622C8.3242 18.4533 7.9139 18.5 7.5001 18.5C4.4625 18.5 2.0001 16.0376 2.0001 13C2.0001 10.3037 3.9403 8.0606 6.5007 7.5906C6.5002 7.5605 6.5 7.5303 6.5 7.5002C6.5 4.4626 8.9624 2.0002 12 2.0002C15.0376 2.0002 17.5 4.4626 17.5 7.5002C17.5 7.5303 17.4998 7.5605 17.4993 7.5906C20.0597 8.0606 21.9999 10.3037 21.9999 13C21.9999 16.0376 19.5375 18.5 16.4999 18.5C16.0861 18.5 15.6758 18.4533 15.2764 18.3622L17.2071 20.2929C17.3946 20.4804 17.5 20.7348 17.5 21C17.5 21.5523 17.0523 22 16.5 22Z" fill="currentColor"/>
    </svg>
  )
}
